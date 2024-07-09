const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createOffer, getOfferByOId, getOfferByVId ,getOfferByUId ,getAllOffers, updateOffer, deleteOffer, getOfferPending, getOfferAccept, getOfferReject, acceptOffer, rejectOffer} = require('../controllers/offerController');



//crete offer routes
router.post('/create_offer', authMiddleware, createOffer);
router.get('/get_offer/:id', getOfferByOId)
router.get('/getAllOffers', getAllOffers);
router.get('/getOffer-User', authMiddleware, getOfferByUId)
router.get('/getOffer-Vendor', authMiddleware, getOfferByVId)
router.put('/update-offer/:id', updateOffer )
router.delete('/delete-offer/:id', deleteOffer)
router.get('/get-pending', getOfferPending);
router.get('/get-accept', getOfferAccept)
router.get('/get-reject', getOfferReject)
router.post('/accept-offer/:offerId', acceptOffer )
router.post('/reject-offer/:offerId', rejectOffer)


module.exports = router;