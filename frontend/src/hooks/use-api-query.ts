import { useEffect } from 'react';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useToast } from './use-toast';

interface ApiError {
  message?: string;
}

export function useApiQuery<T>(
  key: string[],
  fetcher: () => Promise<T>,
  options?: UseQueryOptions<T, AxiosError<ApiError>>
) {
  const { toast } = useToast();

  const query = useQuery<T, AxiosError<ApiError>>({
    queryKey: key,
    queryFn: fetcher,
    ...options,
  });

  const { error } = query;

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  return query;
}

export function useApiMutation<T, V>(
  mutationFn: (variables: V) => Promise<T>,
  options?: UseMutationOptions<T, AxiosError<ApiError>, V>
) {
  const { toast } = useToast();

  return useMutation<T, AxiosError<ApiError>, V>({
    mutationFn,
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive',
      });
    },
    ...options,
  });
}