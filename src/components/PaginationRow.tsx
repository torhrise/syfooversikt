import React from 'react';
import {
    useEffect,
    useState,
} from 'react';
import styled from 'styled-components';
import ChevronKnapp from './ChevronKnapp';

const PaginationItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: space-between;
`;

const PaginationText = styled.div`
  display: inline-flex;
  justify-items: center;
`;

interface PaginationProps {
  startPage?: number;
  numberOfItems: number;
  maxNumberPerPeage: number;
  onPageChange(start: number, end: number, pageNumber: number): void;
}
const PaginationRow = ({
  numberOfItems,
  startPage = 0,
  maxNumberPerPeage,
  onPageChange,
}: PaginationProps) => {

  const getNumberOfPages = () => {
    return Math.floor(numberOfItems / maxNumberPerPeage);
  };
  const [ currentPage, setCurrentPage ] = useState(startPage);

  useEffect(() => {
    setCurrentPage(0);
  }, [numberOfItems]);

  useEffect(() => {
    const chunk = getCurrentChunk();
    onPageChange(chunk.start, chunk.end, currentPage);
  }, [currentPage]);

  const onNextClick = () => {
    const nextPage = Math.min(currentPage + 1, getNumberOfPages());
    if (nextPage > currentPage) {
      setCurrentPage(nextPage);
    }
  };

  const onPreviousClick = () => {
    setCurrentPage(Math.max(currentPage - 1, 0));
  };

  const getCurrentChunk = () => {
    const start = Math.min((currentPage) * maxNumberPerPeage, numberOfItems);
    const end = Math.min(-1 + (currentPage + 1) * maxNumberPerPeage, numberOfItems);
    return {
      start,
      end,
    };
  };

  const getCurrentPageAsNormalizedText = () => `${currentPage + 1}`;
  const getLastPageAsNormalizedText = () => `${getNumberOfPages() + 1}`;

  return (
    <PaginationItems>
        <ChevronKnapp visible type="venstre" onClick={onPreviousClick} />
        <PaginationText>
            <p>Viser side <strong>{getCurrentPageAsNormalizedText()}</strong> av <strong>{getLastPageAsNormalizedText()}</strong></p>
        </PaginationText>
        <ChevronKnapp visible type="høyre" onClick={onNextClick} />
    </PaginationItems>
  );
};

export default PaginationRow;
