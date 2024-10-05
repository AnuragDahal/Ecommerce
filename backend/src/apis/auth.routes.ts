import { Router } from 'express';

const router = Router();

router.post('/sign-up', /* handler */);
router.post('/sign-in', /* handler */);
router.post('/sign-out', /* handler */);
router.post('/change-password', /* handler */);
router.post('/forgot-password', /* handler */);
router.post('/reset-password', /* handler */);
router.post('/verify-email', /* handler */);
router.post('/resend-verification-email', /* handler */);

export default router;