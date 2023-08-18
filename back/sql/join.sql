SELECT
  voitures.titre,
  voitures.descript,
  equipements.nom,
  equipements.id
FROM voitures
JOIN posseder
  ON voitures.id = posseder.voiture_id
JOIN equipements
  ON equipements.id = posseder.equipement_id;