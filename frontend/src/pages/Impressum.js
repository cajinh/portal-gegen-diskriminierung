import React from 'react';
import {
  Grid,
  Typography,
  Link,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Impressum() {
  return (
    <Grid container direction="column" sx={{ height: '100vh' }}>
      <Grid sx={{ height: '8vh' }}>
        <Header />
      </Grid>

      <Grid item sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Impressum
        </Typography>

        <Typography variant="body1" paragraph>
          Hier kommt das Impressum hin.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
          Verwendete Open-Source-Software
        </Typography>

        <Typography variant="body2" paragraph>
          Diese Website verwendet folgende Open-Source-Bibliotheken. Wir danken
          allen Entwickler*innen, die diese Technologien bereitstellen:
        </Typography>

        <List dense>
          {[
            {
              name: 'React',
              license: 'MIT',
              link: 'https://github.com/facebook/react',
            },
            {
              name: 'React DOM',
              license: 'MIT',
              link: 'https://github.com/facebook/react',
            },
            {
              name: 'React Scripts',
              license: 'MIT',
              link: 'https://github.com/facebook/create-react-app',
            },
            {
              name: 'React Router DOM',
              license: 'MIT',
              link: 'https://github.com/remix-run/react-router',
            },
            {
              name: 'React Leaflet',
              license: 'MIT',
              link: 'https://github.com/PaulLeCam/react-leaflet',
            },
            {
              name: 'Leaflet',
              license: 'BSD 2-Clause',
              link: 'https://github.com/Leaflet/Leaflet',
            },
            {
              name: '@emotion/react',
              license: 'MIT',
              link: 'https://github.com/emotion-js/emotion',
            },
            {
              name: '@emotion/styled',
              license: 'MIT',
              link: 'https://github.com/emotion-js/emotion',
            },
            {
              name: '@mui/material',
              license: 'MIT',
              link: 'https://github.com/mui/material-ui',
            },
            {
              name: '@mui/icons-material',
              license: 'MIT',
              link: 'https://github.com/mui/material-ui',
            },
            {
              name: '@turf/boolean-point-in-polygon',
              license: 'MIT',
              link: 'https://github.com/Turfjs/turf',
            },
            {
              name: 'Testing Library',
              license: 'MIT',
              link: 'https://github.com/testing-library',
            },
            {
              name: 'Prettier',
              license: 'MIT',
              link: 'https://github.com/prettier/prettier',
            },
            {
              name: 'Web Vitals',
              license: 'Apache 2.0',
              link: 'https://github.com/GoogleChrome/web-vitals',
            },
          ].map((lib, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText
                primary={
                  <>
                    {lib.name} – {lib.license} Lizenz (
                    <Link
                      href={lib.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Quelle
                    </Link>
                    )
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid sx={{ height: '5vh' }}>
        <Footer />
      </Grid>
    </Grid>
  );
}

export default Impressum;
