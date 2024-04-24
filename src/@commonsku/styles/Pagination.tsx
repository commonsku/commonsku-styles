import React from "react";
import styled from "styled-components";
import { ChevronIcon } from "./icons";
import colors from "./colors";

//Styles Begin
const ScrollControl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const DotsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Dot = styled.button<{ $selected?: boolean }>`
  &&& {
    width: ${(props) => (props.$selected ? "13px" : "8px")};
    height: ${(props) => (props.$selected ? "13px" : "8px")};
    border-radius: 100%;
    padding: 0;
    border: none;
    cursor: pointer;
    background-color: ${(props) =>
      props.$selected ? colors.primary1[65] : colors.neutrals[50]};
  }
`;

const ArrowButton = styled(ChevronIcon)<{ $off?: boolean }>`
  height: 24px;
  width: 24px;
  filter: ${(props) => (props.$off ? "grayscale()" : "none")};
  cursor: ${(props) => (props.$off ? "default" : "pointer")};
`;
//Styles End

interface DotButtonProps {
  currentPage: number;
  page: number;
  onChange: (page: number) => void;
}

const DotButton = ({ currentPage, page, onChange }: DotButtonProps) => {
  if (currentPage === page) {
    return <Dot $selected onClick={() => onChange(page)} />;
  }
  return <Dot onClick={() => onChange(page)} />;
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onChange,
}: PaginationProps) => {
  return (
    <ScrollControl>
      <ArrowButton
        direction="left"
        onClick={() => onChange(Math.max(0, currentPage - 1))}
        $off={currentPage === 0}
      />

      <DotsContainer>
        {Array.from({ length: totalPages }, (_, page) => (
          <DotButton page={page} currentPage={currentPage} onChange={onChange} key={page}/>
        ))}
      </DotsContainer>

      <ArrowButton
        direction="right"
        onClick={() => onChange(Math.min(totalPages - 1, currentPage + 1))}
        $off={currentPage === totalPages - 1}
      />
    </ScrollControl>
  );
};

export default Pagination;
