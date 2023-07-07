DELIMITER $$

CREATE PROCEDURE `get_prev_and_next_ref` (IN car_ref TEXT)
BEGIN
	SELECT prev_ref, ref, next_ref
	FROM (
		SELECT id, 
			   LAG(ref) OVER (ORDER BY id) AS prev_ref,
			   ref,
			   LEAD(ref) OVER (ORDER BY id) AS next_ref
		FROM voitures
	) AS t
	WHERE ref = car_ref;
END$$

DELIMITER ;