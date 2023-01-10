import styled from 'styled-components'
import React from 'react'
import {Textarea} from './Textarea'
import {Avatar} from './Avatar'
import { getThemeColor, colors } from './Theme';
import { SharedStyles, SharedStyleTypes } from './SharedStyles';

const PublisherWrapper = styled.div`background: ${props => getThemeColor(props, "bgblue", colors.bgblue)}; border-radius:5px; padding: 1em; margin-bottom: 1em;`
export const Publisher = (props: React.PropsWithChildren<{}>) => {
  return <PublisherWrapper>
           <Textarea placeholder="Post a note about this project"/>
         </PublisherWrapper>
}

const PostWrapper = styled.div<SharedStyleTypes>`display:flex; margin-bottom: 1em; line-height: 1.5em; ${SharedStyles}`
const WidePart = styled.div`flex-grow:1;`
const Date = styled.span`color: ${props => getThemeColor(props, "textbody", colors.textbody)}; display: inline-block;`
const Action = styled.a`display: inline-block; margin-left: 10px;`
const Author = styled.div`flex-grow: 1; color: ${props => getThemeColor(props, "texttitle", colors.texttitle)}; font-size: 18px; font-family: "skufont-medium", sans-serif; `
const Subject = styled.div`color:${props => getThemeColor(props, "textbody", colors.textbody)}; font-size: 14px; font-family: "skufont-medium", sans-serif; `
const TopLine = styled.div`display:flex;`
const PostFooter = styled.div`font-size:.9em;`
const Comments = styled.div`margin-top: 1em;`

type FeedPostProps = React.PropsWithChildren<{
  author: any, 
  subject?: string, 
  body: React.ReactNode, 
  date: string, 
  comments?: React.ReactNode[]
}> & SharedStyleTypes;

export const FeedPost = React.forwardRef<HTMLDivElement, FeedPostProps> ((
  props: FeedPostProps, ref) => {
 return <PostWrapper ref ={ref} {...props}>
   <Avatar pic={props.author.avatar}/>
   <WidePart>
     <TopLine>
       <Author>{props.author.name}</Author>
       <Subject>{props.subject}</Subject>
     </TopLine>
     {props.body}
     <PostFooter>
       <Date>{props.date}</Date>
       <Action href="#">Comment</Action>
     </PostFooter>
     {props.comments && props.comments.length > 0 ?
     <Comments>
       {props.comments}
     </Comments> : null }
   </WidePart>
 </PostWrapper>
});
