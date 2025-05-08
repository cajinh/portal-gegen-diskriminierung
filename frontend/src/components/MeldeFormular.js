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
import SelectCheckbox from './SelectCheckbox';
import { createReport } from '../api/report';
import { v4 as uuidv4 } from 'uuid';
import HCaptcha from '@hcaptcha/react-hcaptcha';

function Meldeformular({ position, onClose, onSuccess }) {
  const [selectedOptions, setSelectedOptions] = useState('');
  const [description, setDescription] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (selectedOptions.length === 0) return;

    if (!captchaToken) return;

    const data = {
      report_id: uuidv4(),
      categories: selectedOptions,
      location_lng: position[1],
      location_lat: position[0],
      description: description,
      captchaToken,
    };

    try {
      await createReport(data);
      onSuccess?.('Meldung erfolgreich abgesendet!', true);
    } catch (error) {
      onSuccess?.('Fehler beim Absenden der Meldung.', false);
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
          top: { xs: 'auto', sm: 'auto', md: '10vh' },
          right: { xs: '50%', md: '1vw' },
          bottom: { xs: '7vh', sm: '7vh', md: 'auto' },
          transform: { xs: 'translateX(50%)', md: 'none' },
          width: { xs: '90vw', sm: '80vw', md: '40vw' },
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
              padding: 1.5,
              '@media (max-width: 600px)': {
                paddingTop: 1,
                paddingBottom: 1,
              },
            }}
          >
            <Typography
              id="meldeformular-title"
              variant="h6"
              color="white"
              sx={{
                fontSize: {
                  xs: '0.7rem',
                  sm: '0.9rem',
                  md: '1rem',
                },
              }}
            >
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
                sx={{
                  fontSize: {
                    xs: '0.7rem',
                    sm: '0.8rem',
                    md: '1rem',
                  },
                }}
              >
                Position: {position[0].toFixed(5)}, {position[1].toFixed(5)}
              </Typography>
            </Grid>

            <Grid sx={{ width: '100%' }}>
              <Typography
                variant="h6"
                color="black"
                sx={{
                  fontSize: {
                    xs: '0.7rem',
                    sm: '0.9rem',
                    md: '1rem',
                  },
                }}
              >
                Welche Art von Diskriminierung hast du erlebt? *
              </Typography>
              <Typography
                variant="body"
                color="black"
                sx={{
                  fontSize: {
                    xs: '0.6rem',
                    sm: '0.8rem',
                    md: '0.9rem',
                  },
                }}
              >
                Diskriminierung aufgrund...
              </Typography>
            </Grid>

            <Grid sx={{ width: '100%' }}>
              <SelectCheckbox
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
            </Grid>

            {formSubmitted && selectedOptions.length === 0 && (
              <Typography
                variant="body2"
                color="error"
                sx={{
                  fontSize: {
                    xs: '0.6rem',
                    sm: '0.8rem',
                    md: '0.9rem',
                  },
                  mt: 1,
                }}
              >
                Du musst mindestens eine Kategorie auswählen.
              </Typography>
            )}

            <Grid sx={{ width: '100%' }}>
              <TextField
                label="Beschreibung (optional)"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                size="small"
                value={description}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 300) {
                    setDescription(value);
                  }
                }}
                aria-label="Beschreibung der Erfahrung"
                slotProps={{
                  inputLabel: {
                    sx: {
                      fontSize: {
                        xs: '0.6rem',
                        sm: '0.8rem',
                        md: '0.9rem',
                      },
                    },
                  },
                }}
              />

              <Typography
                variant="caption"
                color={description.length >= 270 ? 'error' : 'textSecondary'}
                align="right"
                sx={{
                  display: 'block',
                  textAlign: 'right',
                  mt: 0.5,
                  fontSize: {
                    xs: '0.3rem',
                    sm: '0.5rem',
                    md: '0.6rem',
                  },
                }}
              >
                {description.length}/300 Zeichen
              </Typography>
            </Grid>

            {formSubmitted && !captchaToken && (
              <Typography
                variant="body2"
                color="error"
                sx={{
                  fontSize: {
                    xs: '0.6rem',
                    sm: '0.8rem',
                    md: '0.9rem',
                  },
                  mt: 1,
                }}
              >
                Bitte das CAPTCHA ausfüllen.
              </Typography>
            )}

            <Grid
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <HCaptcha
                sitekey="8c1e7e42-c92c-4698-adc6-f7603fece8e0"
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
              />
            </Grid>

            <Grid container justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                aria-label="Meldung absenden"
                onClick={handleSubmit}
                sx={{
                  fontSize: {
                    xs: '0.6rem',
                    sm: '0.8rem',
                    md: '0.9rem',
                  },
                }}
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
