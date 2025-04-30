import React, { useState } from 'react';
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  ThemeProvider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../theme';
import DropdownSelect from './DropdownSelect';
import { createReport } from '../api/report';
import { v4 as uuidv4 } from 'uuid';

function Meldeformular({ position, onClose }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedOption) {
      //alert('Bitte wähle eine Kategorie aus.');
      return;
    }

    const data = {
      report_id: uuidv4(),
      category_name: selectedOption,
      location_longitude: position[0],
      location_latitude: position[1],
      description: description,
    };

    try {
      await createReport(data);
      alert('Meldung erfolgreich abgesendet!');
    } catch (error) {
      alert('Fehler beim Absenden der Meldung');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper
        role="dialog"
        aria-labelledby="meldeformular-title"
        aria-describedby="meldeformular-description"
        elevation={4}
        sx={{
          position: 'fixed',
          borderRadius: 3,
          top: '10vh',
          right: '1vw',
          width: '40vw',
          zIndex: 1000,
        }}
      >
        <Grid container sx={{ borderRadius: 3 }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            width={'100%'}
            sx={{
              backgroundColor: 'primary.main',
              borderRadius: 3,
              padding: 2,
            }}
          >
            <Typography id="meldeformular-title" variant="h6" color="white">
              Neue Meldung erstellen
            </Typography>
            <IconButton
              onClick={onClose}
              size="small"
              aria-label="Formular schließen"
            >
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{ padding: 2, justifyContent: 'center' }}
          >
            <Grid sx={{ width: '100%' }}>
              <Typography
                variant="body2"
                color="black"
                id="meldeformular-description"
              >
                Position: {position[0].toFixed(5)}, {position[1].toFixed(5)}
              </Typography>
            </Grid>

            <Grid sx={{ width: '100%' }}>
              <Typography variant="h6" color="black">
                Welche Art von Diskriminierung hast du erlebt?
              </Typography>
              <Typography variant="body" color="black">
                Diskriminierung aufgrund...
              </Typography>
            </Grid>

            <Grid sx={{ width: '100%' }}>
              <DropdownSelect
                label="Kategorie wählen"
                aria-label="Diskriminierungs-Kategorie wählen"
                value={selectedOption}
                onChange={setSelectedOption}
                options={[
                  '...der ethnischen Herkunft',
                  '...des Geschlechts',
                  '...der Religion oder der Weltanschauung',
                  '...einer Behinderung',
                  '...des Alters',
                  '...der sexuellen Identität',
                ]}
                required
              />
            </Grid>

            <Grid sx={{ width: '100%' }}>
              <TextField
                label="Beschreibung (optional)"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                size="small"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                aria-label="Beschreibung der Erfahrung"
              />
            </Grid>

            <Grid container justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                aria-label="Meldung absenden"
                onClick={handleSubmit}
              >
                Absenden
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  );
}

export default Meldeformular;
