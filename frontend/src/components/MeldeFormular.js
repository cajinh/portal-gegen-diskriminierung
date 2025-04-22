import React from 'react';
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
import { useState } from 'react';
import DropdownSelect from './DropdownSelect';

function Meldeformular({ position, onClose }) {
  const [selectedOption, setSelectedOption] = useState('');

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
              />
            </Grid>

            <Grid sx={{ width: '100%' }}>
              <TextField
                label="Beschreibung"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                size="small"
                aria-label="Beschreibung der Erfahrung"
              />
            </Grid>

            <Grid container justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                aria-label="Meldung absenden"
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
