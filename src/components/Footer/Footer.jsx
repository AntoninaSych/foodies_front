// src/components/Footer/Footer.js
import { Box, Container, Stack, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const socialLinks = [
  { icon: <InstagramIcon />, href: 'https://instagram.com/...' },
  { icon: <FacebookIcon />, href: 'https://facebook.com/...' },
  { icon: <TwitterIcon />, href: 'https://twitter.com/...' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: '1px solid var(--color-secondary)',
        mt: 'auto',
        backgroundColor: 'var(--color-white)',
      }}
    >
      <Container maxWidth="lg">
        {/* верхній ряд: логотип + соцкнопки */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          sx={{
            py: { xs: 4, md: 5, lg: 8 },
            px: { xs: 2, md: 4, lg: 8 },
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: 'Mulish Bold',
              fontSize: { xs: 20, md: 24 },
              letterSpacing: { xs: '-0.4px', md: '-0.48px' },
              textTransform: 'lowercase',
              color: 'var(--color-main)',
            }}
          >
            foodies
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: { xs: 2, md: 0 } }}>
            {socialLinks.map(({ icon, href }, i) => (
              <IconButton
                key={i}
                component="a"
                href={href}
                target="_blank"
                rel="noopener"
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid rgba(5,5,5,0.12)',
                  transition: 'background-color var(--trns-fast)',
                  '&:hover': {
                    backgroundColor: 'var(--color-main)',
                    border: 'none',
                    '& .MuiSvgIcon-root': {
                      fill: 'var(--color-white)',
                    },
                  },
                }}
              >
                {icon}
              </IconButton>
            ))}
          </Stack>
        </Stack>

        {/* копірайт */}
        <Typography
          variant="body2"
          component="div"
          sx={{
            textAlign: 'center',
            color: 'var(--color-text)',
            fontSize: { xs: 14, md: 16 },
            fontWeight: 500,
            lineHeight: { xs: 1.43, md: 1.5 },
            letterSpacing: { xs: '-0.28px', md: '-0.32px' },
            pt: { xs: 2, md: 4 },
            pb: { xs: 4, md: 5, lg: 8 },
          }}
        >
          &copy; {year} Foodies. All rights reserved
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
