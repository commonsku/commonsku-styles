import React from "react";
import styled from "styled-components";
import { ChevronIcon } from "./icons";
import colors from "./colors";

//Styles Begin
const ScrollControl = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Dot = styled.button<{ $bold?: boolean; $dotColor: string }>`
  &&& {
    width: ${(props) => (props.$bold ? "13px" : "8px")};
    height: ${(props) => (props.$bold ? "13px" : "8px")};
    border-radius: 100%;
    padding: 0;
    border: none;
    cursor: pointer;
    background-color: ${(props) => props.$dotColor};
  }
`;

const ArrowButtons = styled(ChevronIcon)<{ $off?: boolean }>`
  height: 24px;
  width: 24px;
  filter: ${(props) => (props.$off ? "grayscale()" : "none")};
  cursor: ${(props) => (props.$off ? "default" : "pointer")};
`;
//Styles End

interface DotButtonProps {
  currentPage: number;
  id: number;
  onChange: (page: number) => void;
}

const DotButton = ({ currentPage, id, onChange }: DotButtonProps) => {
  if (currentPage == id) {
    return (
      <Dot
        $dotColor={colors.primary1[65]}
        $bold
        key={id}
        onClick={() => onChange(id)}
      />
    );
  }
  return (
    <Dot
      $dotColor={colors.neutrals[50]}
      key={id}
      onClick={() => onChange(id)}
    />
  );
};

const DotButtons = (
  currentPage: number,
  numberOfDots: number,
  onChange: (page: number) => void
) => {
  let dotButtons: React.JSX.Element[] = [];
  for (let id = 0; id < numberOfDots; id++) {
    dotButtons.push(
      <DotButton
        currentPage={currentPage}
        
        id={id}
        onChange={onChange}
      />
    );
  }
  return dotButtons;
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
      {currentPage != 0 ? (
        <ArrowButtons
          direction="left"
          onClick={() => onChange(currentPage - 1)}
        />
      ) : (
        <ArrowButtons $off direction="left" onClick={() => onChange(0)} />
      )}

      {DotButtons(currentPage, totalPages,onChange)}

      {currentPage != totalPages - 1 ? (
        <ArrowButtons
          direction="right"
          onClick={() => onChange(currentPage + 1)}
        />
      ) : (
        <ArrowButtons $off direction="right" onClick={() => onChange(0)} />
      )}
    </ScrollControl>
  );
};

export default Pagination;