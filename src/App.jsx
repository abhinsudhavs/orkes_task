import React, { useEffect } from 'react';
import { Container, Typography, CircularProgress, Stack, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from './Redux/ArticleSlice';
import './App.css'

const App = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.data);
  const loading = useSelector((state) => state.articles.loading);
  const currentPage = useSelector((state) => state.articles.page);

  useEffect(() => {
    dispatch(fetchArticles(1));
  }, [dispatch]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
      dispatch(fetchArticles(currentPage + 1));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, currentPage]);

  useEffect(() => {
    console.log(articles);
  }, [articles]);

  const currentDate = new Date();

  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const dateFormatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = dateFormatter.format(currentDate);

  return (
    <Container maxWidth="md">
      <Typography mt={3} mb={5} variant="h1" sx={{
        fontSize: '20px',
        fontWeight: '600'
      }}>Articles</Typography>

      <Stack direction={{ xs: "column", md: 'column' }} spacing={5}>


        {articles.map((article, index) => (
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <Stack>
              <Box component="img" sx={{
                width: { xs: "100%", md: '300px' },
                height: '200px',
                objectFit: 'cover',
                borderRadius: '20px'
              }} src={article.node.field_photo_image_section} alt='Image' />
            </Stack>
            <Stack>
              <Typography variant='h4' sx={{
                fontSize: { xs: '20px', md: '30px' },
                lineHeight: { xs: '27px', md: '40px' },
                color: 'black',
                fontWeight: '500'
              }}>{article.node.title}</Typography>
              <Typography variant='body1' sx={{
                fontSize: { xs: "16px", md: "20px" },
                fontWeight: "500",
                color: "#555c",
                mt: { xs: 1, md: 2 }
              }}>{formattedDate}</Typography>
            </Stack>
          </Stack>
        ))}

      </Stack>
    
      {loading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
    </Container>
  );
}

export default App;