-- Create type representing JSONB structure
CREATE TYPE jsonb_entry AS (
  date Date,
  done Boolean DEFAULT false
);

-- Function creating initial entries for the whole year
CREATE OR REPLACE FUNCTION insert_initial_entries() RETURNS TRIGGER AS $$
DECLARE
  startDate DATE := DATE '2023-01-01'; -- Change this to the desired starting year
  endDate DATE := DATE '2023-12-31'; -- Change this to the desired ending year
  currentDate DATE;
  entriesJsonb jsonb;
BEGIN
  IF NEW.entries IS NULL THEN
    entriesJsonb := '{}'::jsonb;
  ELSE
    entriesJsonb := NEW.entries;
  END IF;

  FOR currentDate IN SELECT generate_series(startDate, endDate, interval '1 day') LOOP
    IF NOT EXISTS (SELECT FROM jsonb_array_elements(entriesJsonb) j WHERE j->>'date' = TO_CHAR(currentDate, 'YYYY-MM-DD')) THEN
      entriesJsonb := jsonb_insert(entriesJsonb, '{0}', ('{' || '"date":"' || TO_CHAR(currentDate, 'YYYY-MM-DD') || '", "done":false}'::jsonb), true);
    END IF;
  END LOOP;

  NEW.entries := entriesJsonb;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger calling the above function before inserting into habits table
CREATE TRIGGER initialize_habit_entries BEFORE INSERT ON "public"."Habit"
FOR EACH ROW EXECUTE PROCEDURE insert_initial_entries();
