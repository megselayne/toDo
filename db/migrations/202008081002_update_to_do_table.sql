--left out status column in initial migration
ALTER TABLE to_dos
ADD COLUMN status VARCHAR(255);

--adding values for columns
UPDATE to_dos
SET status = 'todo'
WHERE id in(1,2);