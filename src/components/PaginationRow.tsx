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
  maxNumberPerPage: number;
  onPageChange(start: number, end: number, pageNumber: number): void;
}
const PaginationRow = ({
  numberOfItems,
  startPage = 0,
  maxNumberPerPage,
  onPageChange,
}: PaginationProps) => {

  const getNumberOfPages = () => {
    if (numberOfItems === maxNumberPerPage) {
        return 0;
    }
    return Math.floor(numberOfItems / maxNumberPerPage);
  };
  const [ currentPage, setCurrentPage ] = useState(startPage);

  useEffect(() => {
    setCurrentPage(0);
  }, [numberOfItems, maxNumberPerPage]);

  useEffect(() => {
    const chunk = getCurrentChunk();
    onPageChange(chunk.start, chunk.end, currentPage);
  }, [currentPage, maxNumberPerPage]);

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
    const start = Math.min((currentPage) * maxNumberPerPage, numberOfItems);
    const end = Math.min((currentPage + 1) * maxNumberPerPage - 1, numberOfItems);
    return {
      start,
      end,
    };
  };

  const getCurrentPageAsNormalizedText = () => `${currentPage + 1}`;
  const getLastPageAsNormalizedText = () => `${getNumberOfPages() + 1}`;

  return (
    <PaginationItems>
        <ChevronKnapp visible={currentPage !== 0} type="venstre" onClick={onPreviousClick} />
        <PaginationText>
            <p>Side <strong>{getCurrentPageAsNormalizedText()}</strong> av <strong>{getLastPageAsNormalizedText()}</strong></p>
        </PaginationText>
        <ChevronKnapp visible={currentPage !== getNumberOfPages()} type="høyre" onClick={onNextClick} />
    </PaginationItems>
  );
};

export default PaginationRow;
