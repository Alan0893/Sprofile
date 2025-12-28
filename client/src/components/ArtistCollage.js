import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopArtistsLong } from '../api/user';
import { catchErrors } from '../utils';
import Loader from './Loader';

import styled from 'styled-components';
import { theme, mixins, media, Main } from '../styles';
const { colors, fontSizes, spacing } = theme;

const CollageContainer = styled(Main)`
  padding: ${spacing.xl};
`;

const Title = styled.h2`
  text-align: center;
  font-size: ${fontSizes.xxl};
  margin-bottom: ${spacing.md};
  color: ${colors.white};
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${colors.lightGrey};
  margin-bottom: ${spacing.xl};
`;

const CollageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${spacing.sm};
  max-width: 800px;
  margin: 0 auto;
  
  ${media.tablet`
    grid-template-columns: repeat(4, 1fr);
  `};
  
  ${media.phablet`
    grid-template-columns: repeat(3, 1fr);
  `};
`;

const CollageItem = styled(Link)`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  transition: ${theme.transition};
  
  &:hover {
    transform: scale(1.05);
    z-index: 10;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  padding: ${spacing.sm};
  opacity: 0;
  transition: ${theme.transition};
  
  ${CollageItem}:hover & {
    opacity: 1;
  }
`;

const ArtistName = styled.div`
  color: ${colors.white};
  font-size: ${fontSizes.xs};
  font-weight: 700;
  text-align: center;
`;

const DownloadButton = styled.button`
  ${mixins.button};
  display: block;
  margin: ${spacing.lg} auto 0;
  padding: 12px 32px;
`;

const ArtistCollage = () => {
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopArtistsLong();
      setArtists(data.items.slice(0, 36)); // Get 36 artists for a 6x6 grid
    };
    catchErrors(fetchData());
  }, []);

  const downloadCollage = () => {
    // Create a canvas and draw the images
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 6;
    const imageSize = 200;
    canvas.width = gridSize * imageSize;
    canvas.height = gridSize * imageSize;

    let loadedImages = 0;
    const images = [];

    artists.slice(0, 36).forEach((artist, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = artist.images[0]?.url;
      
      img.onload = () => {
        images[index] = img;
        loadedImages++;
        
        if (loadedImages === artists.slice(0, 36).length) {
          // Draw all images
          images.forEach((image, i) => {
            const x = (i % gridSize) * imageSize;
            const y = Math.floor(i / gridSize) * imageSize;
            ctx.drawImage(image, x, y, imageSize, imageSize);
          });
          
          // Download
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'spotify-top-artists-collage.png';
            link.click();
            URL.revokeObjectURL(url);
          });
        }
      };
    });
  };

  return (
    <CollageContainer>
      <Title>Your Top Artists Collage</Title>
      <Subtitle>A visual representation of your favorite artists</Subtitle>
      
      {artists ? (
        <>
          <CollageGrid>
            {artists.map((artist) => (
              <CollageItem key={artist.id} to={`/artist/${artist.id}`}>
                {artist.images[0] && (
                  <img src={artist.images[2]?.url || artist.images[0]?.url} alt={artist.name} />
                )}
                <Overlay>
                  <ArtistName>{artist.name}</ArtistName>
                </Overlay>
              </CollageItem>
            ))}
          </CollageGrid>
          <DownloadButton onClick={downloadCollage}>
            Download Collage
          </DownloadButton>
        </>
      ) : (
        <Loader />
      )}
    </CollageContainer>
  );
};

export default ArtistCollage;
