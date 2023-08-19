/* ajoute les foreign key, attention run le script uniquement dans le cas ou les tables ont étées créées sans FK */
ALTER TABLE commentaires ADD COLUMN utilisateur_id VARCHAR(36);
ALTER TABLE services ADD COLUMN utilisateur_id VARCHAR(36) NOT NULL;
ALTER TABLE horaires ADD COLUMN utilisateur_id VARCHAR(36) NOT NULL;
ALTER TABLE messages ADD COLUMN utilisateur_id VARCHAR(36);
ALTER TABLE voitures ADD COLUMN utilisateur_id VARCHAR(36) NOT NULL;

ALTER TABLE commentaires ADD FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id);
ALTER TABLE services ADD FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id);
ALTER TABLE horaires ADD FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id);
ALTER TABLE messages ADD FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id);
ALTER TABLE voitures ADD FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id);