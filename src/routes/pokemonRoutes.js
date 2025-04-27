import express from 'express';
import Pokemon from '../models/Pokemon.js';
import user from '../middlewares/user.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();  
// Types de fichiers autorisés
const filetypes = /jpeg|jpg|png/;

// Définir où et comment stocker les fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Le dossier où les fichiers seront enregistrés
    cb(null, "src/assets/pokemons/");
  },
  filename: function (req, file, cb) {
    const id = req.body.id;  // Utilise l'ID passé dans le corps de la requête
    const extname = path.extname(file.originalname).toLowerCase();  // Récupère l'extension du fichier
    cb(null, `${id}${extname}`);  // Utilise l'ID pour nommer le fichier
  }
});


// Vérification du type de fichier
const fileFilter = (req, file, cb) => {
  // Vérifie si le fichier a une extension valide (jpeg, jpg, png)
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Le fichier est valide
  } else {
    cb(new Error("Seules les images JPG, JPEG et PNG sont autorisées !"), false); // Fichier invalide
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter // Ajout de la vérification du type de fichier
});

// GET - Récupérer tous les pokémons
router.get('/api/pokemons', user, async (req, res) => {
  try {
    const pokemons = await Pokemon.find({});
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des pokémons",
      error: error.message
    });
  }
});

// GET - Récupérer un pokémon par son ID
router.get('/api/pokemons/:id', user, async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: req.params.id });
    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon non trouvé" });
    }
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du pokémon",
      error: error.message
    });
  }
});

// POST - Créer un nouveau pokémon
router.post('/api/pokemons', user, upload.single('image'), async (req, res) => {
  try {
    // Parse proprement les données envoyées en JSON dans "pokemon"
    const parsedPokemon = JSON.parse(req.body.pokemon);

    // Vérifier que l'ID n'existe pas déjà
    const existingPokemon = await Pokemon.findOne({ id: parsedPokemon.id });
    if (existingPokemon) {
      return res.status(400).json({ message: "Un pokémon avec cet ID existe déjà." });
    }

    // Vérifier que l'image est bien présente
    if (!req.file) {
      return res.status(400).json({ message: "L'image est requise." });
    }

    const imagePath = `/assets/pokemons/${req.file.filename}`;

    // Créer le nouveau Pokémon avec les bonnes données
    const newPokemon = new Pokemon({
      ...parsedPokemon,
      image: imagePath,
    });

    await newPokemon.save();

    res.status(201).json(newPokemon);
  } catch (error) {
    console.error("Erreur lors de la création du pokémon :", error);
    res.status(400).json({
      message: "Erreur lors de la création du pokémon",
      error: error.message
    });
  }
});




// PUT - Mettre à jour un pokémon
router.put('/api/pokemons/:id', user, async (req, res) => {
  try {
    // On ne garde que les champs présents dans le corps de la requête et qui correspondent à ceux de l'objet base
    const updatedFields = {};

    // On vérifie les champs de base du Pokémon (HP, Attack, etc.) dans la requête
    if (req.body.hp) updatedFields['base.HP'] = req.body.hp;
    if (req.body.attack) updatedFields['base.Attack'] = req.body.attack;
    if (req.body.defense) updatedFields['base.Defense'] = req.body.defense;
    if (req.body.speed) updatedFields['base.Speed'] = req.body.speed;
    if (req.body.spAttack) updatedFields['base.Sp. Attack'] = req.body.spAttack;
    if (req.body.spDefense) updatedFields['base.Sp. Defense'] = req.body.spDefense;

    // On effectue la mise à jour avec les champs spécifiés seulement
    const updatedPokemon = await Pokemon.findOneAndUpdate(
      { id: req.params.id },
      { $set: updatedFields }, // Mise à jour des champs de l'objet base seulement
      { new: true, runValidators: true }
    );

    if (!updatedPokemon) {
      return res.status(404).json({ message: "Pokémon non trouvé" });
    }

    res.status(200).json(updatedPokemon);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour du pokémon",
      error: error.message
    });
  }
});



// DELETE - Supprimer un pokémon
router.delete('/api/pokemons/:id', user, async (req, res) => {
  try {
    const deletedPokemon = await Pokemon.findOneAndDelete({ id: req.params.id });
    if (!deletedPokemon) {
      return res.status(404).json({ message: "Pokémon non trouvé" });
    }
    res.status(200).json({
      message: "Pokémon supprimé avec succès",
      pokemon: deletedPokemon
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du pokémon",
      error: error.message
    });
  }
});

export default router;
