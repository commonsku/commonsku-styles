import { IconButton, EyeIcon, ClipboardIcon, SharedStyleTypes, SizerTypes } from "@commonsku/styles";
import React,  { useState }from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled,  { css, CSSObject }  from "styled-components";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CodeBlock, CopyBlock, nord, solarizedDark, solarizedLight, atomOneDark, atomOneLight, codepen, arta, github, googlecode, monoBlue, monokai, ocean, obsidian, hybrid, hopscotch, irBlack, far, dracula} from 'react-code-blocks';

const CodeDiv = styled.div`
    margin-bottom: 24px;
`;

type DemoCodeBlockProps = {
    code: any,
    language?: string,
    showLineNumbers?: boolean,
    theme?: string,
    showCode?: boolean,
    style?: React.CSSProperties,
} & SharedStyleTypes & SizerTypes;

export function DemoCodeBlock({ 
    code,
    language,
    showLineNumbers,
    theme,
    style={},
    ...props
}: DemoCodeBlockProps) {

    const [isClicked, setClicked] = useState(false);
    const [isCopied, setCopied] = useState(false);

    return (
     
        <CodeDiv style={style}>
            <IconButton Icon={EyeIcon} iconProps={isClicked ? {hide: true} : undefined} size="tiny" variant="text" mb={ isClicked ? 16 : 0} onClick={() => setClicked(!isClicked)}>{ isClicked ? "Hide Code" : "See Code"}</IconButton>

            
            
            { isClicked ? 

                <><IconButton
                
                    Icon={ClipboardIcon}
                    size="tiny"
                    variant="text"
                    mb={ 0}
                    style={{marginLeft: "auto"}}
                    onClick={() => {
                        setCopied(isCopied === false ? !isCopied : isCopied);
                        navigator.clipboard.writeText(code);
                    }}
                >
                    {isCopied ? "Copied!" : "Copy Code"}
                </IconButton>
                
                <CodeBlock
                        showCode={isClicked}
                        text={code}
                        language={language ? language : "jsx"}
                        showLineNumbers={showLineNumbers ? showLineNumbers : true}
                        theme={theme ? theme : nord}
                        customStyle={{
                            maxHeight: '400px',
                            overflow: 'scroll',
                        }}
                        {...props} /></>

                : null }
           
        </CodeDiv>
        
        
       
    );
}


export function DemoComponentCode(props) {
    return (
        <>
        <CopyBlock
            text={props.code}
            language={props.language ? props.language : "tsx"}
            showLineNumbers={props.showLineNumbers ? props.showLineNumbers : true}
            theme={props.theme ? props.theme : nord}
            wrapLines 
        />
        </>
    );
  }