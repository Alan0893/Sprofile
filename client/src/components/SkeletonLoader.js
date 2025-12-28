import styled, { keyframes } from 'styled-components';
import { theme } from '../styles';
const { colors, spacing } = theme;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    ${colors.darkGrey} 0%,
    ${colors.grey} 50%,
    ${colors.darkGrey} 100%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
  border-radius: 4px;
`;

export const SkeletonCircle = styled(SkeletonBase)`
  border-radius: 100%;
  width: ${props => props.size || '150px'};
  height: ${props => props.size || '150px'};
`;

export const SkeletonRect = styled(SkeletonBase)`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  margin-bottom: ${props => props.margin || '0'};
`;

export const SkeletonText = styled(SkeletonBase)`
  width: ${props => props.width || '100%'};
  height: 16px;
  margin-bottom: ${spacing.xs};
`;

// Profile Skeleton
export const ProfileSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.xl};
`;

// Artist Grid Skeleton
export const ArtistGridSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 50px;
`;

export const ArtistCardSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Track List Skeleton
export const TrackListSkeleton = styled.div`
  margin-top: 50px;
`;

export const TrackItemSkeleton = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: ${spacing.md};
  padding: ${spacing.sm} 0;
  border-bottom: 1px solid ${colors.darkGrey};
`;
