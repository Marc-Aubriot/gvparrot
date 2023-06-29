use ecfgvparrot;
select * from voitures;
select * from horaires;
select * from services;
select * from messages;
select * from commentaires;
select * from utilisateurs;
select * from equipements;

SELECT COUNT(id) FROM voitures;
SELECT * FROM horaires WHERE id = 1;
SELECT * FROM messages WHERE lecture = 0 ORDER BY id DESC;

drop table messages;
drop table horaires;
drop table voitures;
drop table utilisateurs;

select prev_ref, ref, next_ref
from (
    select id, 
           lag(ref) over (order by id) as prev_ref,
           ref,
           lead(ref) over (order by id) as next_ref
    from voitures
) as t
where ref = '50478b5e-00c7-49c7-9dfa-6a0690e02635';

DELIMITER $$
USE `ecfgvparrot`$$
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
	WHERE id = car_ref;
END$$

DELIMITER ;

call get_prev_and_next_ref('50478b5e-00c7-49c7-9dfa-6a0690e02635');
drop procedure get_prev_and_next_ref;