import styled from 'styled-components';
import { BiCloudDownload } from 'react-icons/bi';
import priorities from '../data/priorities';
import { handleTheShortData } from '../utils/handleTheData';
const StyledDetailRow = styled.div`
  display: grid;
  grid-template-columns: 22rem 1fr;
  padding: 0 1rem 0 0;

  & .label {
    color: var(--color-primary-800);
  }
  & .data {
    font-size: 1.55rem;
  }
  & .priority {
    text-transform: capitalize;
    & span {
      font-weight: 700;
      font-size: 1.7rem;
      letter-spacing: 0.07rem;
    }
  }
  & .domain {
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.1rem;
    color: var(--color-primary-600);
  }

  & div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const ImageContainer = styled.div`
  border: 2px solid var(--color-primary-600);
  border-radius: 50%;
  max-width: 4.2rem;
  min-width: 4.2rem;
  max-height: 4.2rem;
  min-height: 4.2rem;
  overflow: hidden;

  & img {
    max-width: 4.2rem;
    min-width: 4.2rem;
    max-height: 4.2rem;
    min-height: 4.2rem;
    transition: all 0.2s;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const FileDownloadButton = styled.a`
  background-color: var(--color-primary-600);
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: 0.5rem;
  color: var(--color-grey-100);
  & svg {
    width: 3rem;
    height: 3rem;
    transition: all 0.2s;
  }

  &:hover {
    background-color: var(--color-primary-700);
    & svg {
      transform: translateY(0.3rem);
    }
  }
`;

/* eslint-disable react/prop-types */
function DetailRow({ label, data, img = {}, priority, file, domain }) {
  return (
    <StyledDetailRow>
      <p className="label">{label}</p>

      <div>
        {img.alt ? (
          <ImageContainer>
            <img src={img.src} alt={img.alt} />
          </ImageContainer>
        ) : null}

        {priority ? (
          <p className="data priority">
            {priority}{' '}
            <span style={{ color: priorities[priority].color }}>
              {priorities[priority].symbol}
            </span>
          </p>
        ) : null}

        {domain ? (
          <p className="data domain">{handleTheShortData(domain)}</p>
        ) : null}

        {file ? (
          <FileDownloadButton href={file}>
            <BiCloudDownload /> Download Attachment
          </FileDownloadButton>
        ) : null}

        {data ? <p className="data">{data}</p> : null}
      </div>
    </StyledDetailRow>
  );
}

export default DetailRow;
