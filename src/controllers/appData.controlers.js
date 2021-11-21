const express = require( "express" );
const AppData = require( "../models/appData.model" );
const router = express.Router();

router.post( "/appData", async ( req, res ) => {
    try {
        let appData = new AppData( req.body );
        appData = await appData.save();
        res.status( 200 ).json( {
            status: 200,
            data: appData,
        } );
    } catch ( err ) {
        res.status( 400 ).json( {
            status: 400,
            message: err.message,
        } );
    }
} );

router.get( "/appData", async ( req, res ) => {
    try {
        let users = await AppData.find();
        res.status( 200 ).json( {
            status: 200,
            data: users,
        } );
    } catch ( err ) {
        res.status( 400 ).json( {
            status: 400,
            message: err.message,
        } );
    }
} );

router.get( "/:appDataId", async ( req, res ) => {
    try {
        let appData = await AppData.findOne( {
            _id: req.params.appDataId,
        } );
        if ( appData ) {
            res.status( 200 ).json( {
                status: 200,
                data: appData,
            } );
        }
        res.status( 400 ).json( {
            status: 400,
            message: "No appData found",
        } );
    } catch ( err ) {
        res.status( 400 ).json( {
            status: 400,
            message: err.message,
        } );
    }
} );

router.put( "/:appDataId", async ( req, res ) => {
    try {
        let appData = await AppData.findByIdAndUpdate( req.params.appDataId, req.body, {
            new: true,
        } );
        if ( appData ) {
            res.status( 200 ).json( {
                status: 200,
                data: appData,
            } );
        }
        res.status( 400 ).json( {
            status: 400,
            message: "No appData found",
        } );
    } catch ( err ) {
        res.status( 400 ).json( {
            status: 400,
            message: err.message,
        } );
    }
} );

router.delete( "/:appDataId", async ( req, res ) => {
    try {
        let appData = await AppData.findByIdAndRemove( req.params.appDataId );
        if ( appData ) {
            res.status( 200 ).json( {
                status: 200,
                message: "AppData deleted successfully",
            } );
        } else {
            res.status( 400 ).json( {
                status: 400,
                message: "No appData found",
            } );
        }
    } catch ( err ) {
        res.status( 400 ).json( {
            status: 400,
            message: err.message,
        } );
    }
} );

module.exports = router;


