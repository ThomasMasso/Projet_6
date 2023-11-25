const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.getAllSauce = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
};

exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; // nouvel _id généré par BDD
    delete sauceObject._userId; // nouveau userId provenant du token d'authentification
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // multer fournit que nom de fichier => générer l'URL
    });
  
    sauce.save()
    .then(() => { res.status(201).json({message: 'Sauce enregistrée !'})})
    .catch(error => { res.status(400).json( { error })})
};

exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }))
};

exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(403).json({ message: 'unauthorized request' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({message : 'Sauce supprimée !'}))
                        .catch(error => res.status(401).json({ error }));
                });
            };
        })
        .catch(error => res.status(500).json({ error }));
};

exports.modifySauce = (req, res,) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'unauthorized request'});
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Sauce modifiée!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error =>  res.status(400).json({ error }))
 };

exports.likeSauce = (req, res) => {
    if (req.body.like === 1) {

        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { likes: req.body.like++ },
                $push: { usersLiked: req.body.userId}
            }
        )
            .then(() => res.status(200).json({message : 'Sauce liked !'}))
            .catch((error) => res.status(400).json({ error }))
    
    } else if (req.body.like === -1) {

        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { dislikes: req.body.like++ * -1 },
                $push: { usersDisliked: req.body.userId}
            }
        )
            .then(() => res.status(200).json({message : 'Sauce disliked !'}))
            .catch((error) => res.status(400).json({ error }))

    } else {

        Sauce.findOne({ _id: req.params.id })
                .then((sauce) => {
                    if (sauce.usersLiked.includes(req.body.userId)) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $pull: { usersLiked: req.body.userId },
                                $inc: { likes: -1 }
                            }
                        )
                        .then(() => res.status(200).json({message : 'Like enlevé !'}))
                        .catch((error) => res.status(400).json({ error }))

                    } else if (sauce.usersDisliked.includes(req.body.userId)) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $pull: { usersDisliked: req.body.userId },
                                $inc: { dislikes: -1 }
                            }
                        )
                        .then(() => res.status(200).json({message : 'Dislike enlevé !'}))
                        .catch(error =>  res.status(400).json({ error }))
                    }
                })
                .catch(error =>  res.status(400).json({ error }))
    }      
}
