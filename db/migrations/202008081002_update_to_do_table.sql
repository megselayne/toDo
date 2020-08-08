--left out status column in initial migration
ALTER TABLE to_dos
ADD COLUMN status VARCHAR(255);