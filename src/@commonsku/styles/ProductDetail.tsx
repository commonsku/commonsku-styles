import { map, get, filter, round, toNumber } from 'lodash';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip'
import { ButtonVariant, IconButton, TButtonIcon } from './Button';
import colors from './colors';
import styled, { CSSProperties, StyledComponent } from 'styled-components';
import { Col, Row } from './FlexboxGrid';
import { Label } from './Label';
import { SharedStyleTypes } from './SharedStyles';
import { SizerTypes } from './Sizer';
import { Table, TBody, TR, TD } from './Table';
import Theme, { themeOptions } from './Theme';
import { DoubleArrowIcon, ArrowIcon, AddIcon, CheckmarkIcon } from './icons';

const IMAGE_WIDTH_THRESHOLD = 250;
const IMAGE_HEIGHT_THRESHOLD = 250;
const INITIAL_THUMBNAILS_COUNT = 11;
const SLICE_COUNT = 2;

const ThumbnailVerticalContainer = styled.div`
    max-height: 660px;
    height: 660px;
    overflow: auto;
    margin-top: 20px !important;
    padding-right: 5px !important;
`;

const MainViewing = styled.div`
    width: 600px;
    height: 600px;
    background-position: right;
    background-repeat: no-repeat;
    background-size: contain;
`;

const Main = styled.div`
    width: 100%;
    height: 478px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin-bottom: 20px !important;
`;

const StyledTooltip = styled(Tooltip)`
    background: #123952E5 !important;
    width: 250px !important;
    font-size: large !important;
`;

const ThumbnailContainer = styled.div`
        max-height: 190px;
        overflow: auto;
`;

const Sku = styled.div`
  &&& {
    height: 28px;
    font-family: var(--font-family-regular);
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 0.5rem;
    color: ${colors.neutrals['90']};

}`;

const SelectableThumbnail = styled.div`
  &&& {
    display: flex;
    width: 99px;
    height: 99px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex-shrink: 0;
  }
`;

const InnerFrameThumbnail = styled.div`
  &&& {
    display: flex;
    padding: 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
    justify-content: center;
    align-items: center;
  }
`;

const SizeTag = styled.div`
  &&& {
    display: inline-flex;
    padding: 3px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 200px;
    background: ${colors.teal[80]};

    color: ${colors.white};
    text-align: center;
    

    font-family: var(--font-family-regular);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; 
  }
`;

type ImageProps = {
  url: string;
  width?: number;
  height?: number;
}

type PriceProps = {
  min_quantity: number;
  price: string;
}

type ProductDetailProps = {
  name: string;
  sku: string;
  descriptions: string[] | string;
  sizes: string[];
  allColors: string[];
  images: ImageProps[];
  mainImage: ImageProps;
  prices: PriceProps[];
  handleClickProductEvent: () => void;
  selected: boolean;
  showAddButton: boolean;
  costBased?: string;
  productHref?: string;
}

type MainImageProps = {
  image: ImageProps;
  StyledDiv: StyledComponent<"div", any, {}, never>;
}

// can import from Button
type IconFuncProps = { color: string;[key: string]: any };

type ButtonState = {
  icon?: TButtonIcon | React.ReactElement<IconFuncProps>;
  variant: ButtonVariant;
  name: string;
} & SharedStyleTypes & SizerTypes;

// can import from ArrowIcon
type ArrowIconDirection = 'up' | 'right' | 'down' | 'left';

type autoHideImageProps = {
  src: string,
  onClick: () => void,
  style?: CSSProperties
};

const AutoHideImage = ({ src, ...props }: autoHideImageProps) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (error
    ? null
    : <img
      alt=""
      onLoad={() => {
        setError(false);
      }}
      onError={() => {
        setError(true);
      }}
      src={src}
      {...props}
    />)
    ;
};

const MainImage = ({ image, StyledDiv }: MainImageProps) => {
  return StyledDiv && <StyledDiv style={{
    backgroundImage: `url("${get(image, 'url')}")`
  }}></StyledDiv>;
};

const ReadMore = (props: { text: string }) => {
  const [readMore, setReadMore] = useState(true);
  const truncateLength = 400;
  const tempDiv = window.document.createElement('div');
  tempDiv.innerHTML = props.text;
  const innerText = tempDiv.innerText.substring(0, readMore ? truncateLength : props.text.length);

  return <Col style={{flex: '0 1 0%', marginBottom: 27}}>
    <div style={{ position: 'relative', display: 'inline-block', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-family-regular)' }}>
      {innerText}
      {props.text.length > truncateLength &&
        <div onClick={() => setReadMore(!readMore)} style={{
          background: 'linear-gradient(0deg, #F1FBFC 10.98%, rgba(255, 255, 255, 0) 100%)',
          display: 'flex',
          position: 'absolute',
          justifyContent: 'center',
          width: '100%',
          bottom: readMore ? '0' : '-20px',
          transition: 'visibility 0s linear 300ms, opacity 300ms',
          cursor: 'pointer'
        }}>
          {readMore
            ? <DoubleArrowIcon direction="down" color={colors.teal[65]} />
            : <DoubleArrowIcon direction='up' color={colors.teal[65]} />
          }
        </div>}
    </div>
  </Col>
}

type ImageGalleryProps = {
  image: ImageProps,
  setImage: React.Dispatch<React.SetStateAction<ImageProps>>,
  filtered: ImageProps[], 
  handleMoreImagesBtnClick: () => void
}

const ImageGallery = ({image, setImage, filtered, handleMoreImagesBtnClick}: ImageGalleryProps) => {
  const thumbnailDiv = useRef<HTMLDivElement>(null);
  const [slicedThumbnails, setSlicedThumbnails] = useState(() => filtered.slice(0, INITIAL_THUMBNAILS_COUNT));
  useEffect(() => {
    setSlicedThumbnails(filtered.slice(0, INITIAL_THUMBNAILS_COUNT));
  }, [filtered])
  
  useEffect(() => {
    const divElement = thumbnailDiv.current;
    const checkOverflow = () => {
      if (divElement) {
        if (divElement.clientHeight < divElement.scrollHeight || divElement.offsetHeight < divElement.clientHeight) {
          setSlicedThumbnails(slicedThumbnails.slice(0, -SLICE_COUNT));
        }
      }
    }
    setTimeout(checkOverflow, 0);
    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
    }
  }, [slicedThumbnails])
  
  return <div style={{ width: '100%' }}>
    <MainImage image={image} StyledDiv={Main} />
    <ThumbnailContainer ref={thumbnailDiv} style={{ overflow: 'hidden' }}>
      <Row>
        {image && map(slicedThumbnails, (thumbnail, i) => {
          console.log('slicedThumbnails mapping', slicedThumbnails);
          const selected = thumbnail.url === image.url ? { border: `3px solid ${colors.teal['70']}`, borderRadius: 5 } : {};
          return <SelectableThumbnail key={i} style={selected}>
            <InnerFrameThumbnail>
              <AutoHideImage
                key={i}
                src={thumbnail.url}
                onClick={() => { setImage(thumbnail); } }
                style={{
                  display: 'inline-block',
                  objectFit: 'contain',
                  cursor: 'pointer'
                }} /></InnerFrameThumbnail>
          </SelectableThumbnail>;
        })}
        {filtered.length > slicedThumbnails.length
          ? <div style={{
            width: '15%', height: '15%', display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer'
          }}><span style={{
            backgroundColor: 'white',
            color: colors.teal[65],
            fontWeight: 'bolder',
            paddingTop: '15%',
            fontSize: 'xx-large'
          }}
            onClick={handleMoreImagesBtnClick}>
              ...</span>
          </div>
          : null}
      </Row>
    </ThumbnailContainer>
  </div>;
}

export const ProductDetail = ({ name, sku, descriptions, sizes, allColors, images, mainImage, prices, handleClickProductEvent, selected, showAddButton, costBased, productHref = '#' }: ProductDetailProps) => {
  
  const [isTextOverflowed, setIsTextOverflowed] = useState(false);
  const [image, setImage] = useState(mainImage);
  const [hover, setHover] = useState(false);
  
  const filtered = useMemo(() => filter(images, ({ width = 0, height = 0 }) => {
    return (!width && !height) || width > IMAGE_WIDTH_THRESHOLD || height > IMAGE_HEIGHT_THRESHOLD;
  }) || images, [images]);

  useEffect(() => {
    setImage(mainImage);
  }, [mainImage])


  const [showAllImages, setShowAllImages] = useState(false);

  const handleMoreImagesBtnClick = () => {
    setShowAllImages(true);
  }

  const tableRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  let factor = 1;
  const [arrowDirection, setArrowDirection] = useState<ArrowIconDirection>('right');

  function scrollTable() {
    const offset = 258;
    if (tableRef.current) {
      const element = tableRef.current;
      if (element.scrollWidth > element.clientWidth) {
        if (Math.round(element.scrollLeft + element.clientWidth) === element.scrollWidth) {
          factor = -1;
        }
        if (element.scrollLeft === 0) {
          factor = 1;
        }
        element.scrollLeft += (offset * factor);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const element = tableRef.current;
        if (Math.round(tableRef.current.scrollLeft + element.clientWidth) === element.scrollWidth) {
          setArrowDirection('left');
        }
        if (element.scrollLeft === 0) {
          setArrowDirection('right');
        }
      }
    }
    const scrollElement = tableRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    }
  }, [])

  useLayoutEffect(() => {
    const handleResize = () => {
      let isOverflowed = false;
      if (textRef.current) {
        isOverflowed = textRef.current.scrollHeight > textRef.current.clientHeight;
      }
      setIsTextOverflowed(isOverflowed);
    }

    setTimeout(handleResize, 0);  // call immediately to set initial value
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const buttonState = (): ButtonState => {
    if (hover && selected) {
      return { icon: undefined, variant: 'error', name: 'Remove from Project' };
    } else if (selected) {
      return { icon: CheckmarkIcon, variant: 'primary', name: 'Added to Project' };
    } else {
      return { icon: AddIcon, variant: 'primary', name: 'Add to Project' };
    }
  }

  const button = buttonState();

  return (
    <Theme theme={themeOptions}>
      <div style={{ overflowY: 'hidden', padding: 0, height: '100%' }}>
        {showAllImages
          ? <>
            <Row style={{ marginTop: '15px', position: 'absolute', top: 85, zIndex: '100', gap: 16, alignItems: 'center' }}>
              <ArrowIcon direction='left' size='large' onClick={() => setShowAllImages(false)} style={{ cursor: 'pointer' }} />
              <h2 style={{fontSize: 24,
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '40px',
                  margin: 0,}}>
              Viewing Product Images
              </h2>
            </Row>
            <Row>
              <Col sm={2} md={2} lg={2} style={{alignItems: 'flex-start'}}>
                <ThumbnailVerticalContainer>
                  {image && map(filtered, (thumbnail, i) => {
                    const selected = thumbnail.url === image.url ? { border: `3px solid ${colors.teal['70']}`, borderRadius: 5 } : {};
                    return <SelectableThumbnail key={i}>
                      <InnerFrameThumbnail style={selected}>
                        <AutoHideImage
                          key={i}
                          src={thumbnail.url}
                          onClick={() => { setImage(thumbnail) }}
                          style={{
                            display: 'inline-block',
                            height: '80px',
                            width: '80px',
                            objectFit: 'contain',
                            cursor: 'pointer'
                          }}
                        />
                      </InnerFrameThumbnail>
                    </SelectableThumbnail>
                  })}
                </ThumbnailVerticalContainer>
              </Col>
              <Col offset={1} sm={12} md={9} lg={9} style={{ alignSelf: 'center' }}>
                <MainImage image={image} StyledDiv={MainViewing} />
              </Col>
            </Row>
          </>
          : <Row style={{alignItems: 'flex-start', height: '100%'}} >
            <Col md={6} sm={12} lg={6} style={{ paddingRight: '15px' }}>
              <ImageGallery image={image} setImage={setImage} filtered={filtered} handleMoreImagesBtnClick={handleMoreImagesBtnClick} />
            </Col>
            <Col md={6} sm={12} lg={6} style={{ height: '100%', overflow: 'auto', display: 'flex',
              flexDirection: 'column',
              gap: 16, }}>
              <Row>
              <h1 ref={textRef} data-tooltip-id='title' data-tooltip-content={name} style={{ maxHeight: '96px', overflow: 'hidden', fontSize: 32,
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '48px',
                margin: 0, 
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                display: '-webkit-box'}}>{name}</h1>
                
              {isTextOverflowed
                ? <StyledTooltip id='title'  place="left" />
                : null
              }
              </Row>
              <Sku>{sku}</Sku>
              {prices &&
                <section>
                  <div ref={tableRef} style={{ overflowX: 'hidden', display: 'flex', scrollBehavior: 'smooth' }}>
                    <Table style={{ marginBottom: '8px', pointerEvents: 'none', borderTop: `1px solid ${colors.neutrals['70']}`, borderBottom: `1px solid ${colors.neutrals['70']}` }} >
                      <TBody style={{ border: 'none' }} >
                        <TR>
                          <TD style={{fontFamily: 'var(--font-family-demibold)'}}>Qty</TD>
                          {map(prices, ({ min_quantity }, i) => {
                            return <TD style={{ textAlign: 'right' }} key={i}>{min_quantity}</TD>
                          })
                          }
                        </TR>
                        <TR>
                          <TD style={{fontFamily: 'var(--font-family-demibold)'}}>Price</TD>
                          { // call checkCredential ?
                            map(prices, ({ price }, i) => {
                              return <TD style={{ textAlign: 'right' }} key={i}>${round(toNumber(price), 2)}</TD>
                            })
                          }
                        </TR>
                      </TBody>
                    </Table>
                  </div>
                  <Row style={{ justifyContent: 'space-between', fontFamily: 'var(--font-family-regular)' }}>
                    {costBased &&
                      <span style={{ color: colors.neutrals[90] }}>{costBased}</span>
                    }
                    {tableRef.current && (tableRef.current.clientWidth < tableRef.current.scrollWidth)
                      ? <span style={{ float: 'right', cursor: 'pointer' }} onClick={scrollTable} >scroll to see more
                        <ArrowIcon direction={arrowDirection} size="tiny" color={colors.teal['65']} />
                      </span>
                      : null
                    }
                  </Row>
                </section>
              }
              {
                showAddButton &&
                <Row onMouseOver={() => setHover(true)}
                  onMouseOut={() => setHover(false)}>
                  <Col md={12} sm={12} lg={12} >
                    <IconButton
                      variant={button.variant}
                      size='huge'
                      Icon={button.icon}
                      iconPosition='left'
                      style={{ padding: '16px 32px', width: '100%' }}
                      onClick={handleClickProductEvent}
                    >
                      {button.name}
                    </IconButton>
                  </Col>
                </Row>
              }
              <Row>
                <a href={productHref} target='_blank' style={{ width: '100%', textDecoration: 'none' }}><div style={{width: '100%', textAlign: 'center', color: colors.teal['70'], fontSize: 16, fontFamily: 'var(--font-family-regular)', fontWeight: '400', lineHeight: '24px', wordWrap: 'break-word'}}>View Product Page</div></a>
              </Row>
              {Array.isArray(descriptions)
                ? <ReadMore text={descriptions.join('\n')} />
                : <ReadMore text={descriptions} />
              }
              <Row style={{ pointerEvents: 'none' }}>
                <Col md={2} lg={2} sm={12}>
                  <Label style={{ lineHeight: '30px' }}>Sizes: </Label>
                </Col>
                <Col md={10} lg={10} sm={12} style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                  {map(sizes, (s, i) => {
                    return <SizeTag
                      key={s + i}
                    >{s.toUpperCase()}</SizeTag>
                  })}
                </Col>
              </Row>
              <Row style={{ pointerEvents: 'none' }}>
                <Col md={2} lg={2} sm={12}>
                  <Label style={{ pointerEvents: 'none',lineHeight: '30px' }}>Colors: </Label>
                </Col>
                <Col md={10} lg={10} sm={12} style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                  {map(allColors, (c, i) => {
                    return <SizeTag
                      key={c + i}
                    >{c}</SizeTag>
                  })}
                </Col>
              </Row>
            </Col>
          </Row>
        }
      </div>
    </Theme>)
}

export default ProductDetail;