import styled from 'styled-components'
import React from 'react'
import {Textarea} from './Textarea'
import {Avatar} from './Avatar'

export const Publisher = (props: React.PropsWithChildren<{}>) => {
  const PublisherWrapper = styled.div`background:#ECF4F7; border-radius:5px; padding: 1em; margin-bottom: 1em;`
  return <PublisherWrapper>
           <Textarea placeholder="Post a note about this project"/>
         </PublisherWrapper>
}

export const FeedPost = (props: React.PropsWithChildren<{author: any, subject?: string, body: React.ReactNode, date: string, comments?: React.ReactNode[]}>) => {
 const PostWrapper = styled.div`display:flex; margin-bottom: 1em; line-height: 1.5em;`
 const WidePart = styled.div`flex-grow:1;`
 const Date = styled.span`color:#52585C; display: inline-block;`
 const Action = styled.a`display: inline-block; margin-left: 10px;`
 const Author = styled.div`flex-grow: 1; color: #123952; font-size: 18px; font-family: "skufont-medium", sans-serif; `
 const Subject = styled.div`color: #52585C; font-size: 14px; font-family: "skufont-medium", sans-serif; `
 const TopLine = styled.div`display:flex;`
 const PostFooter = styled.div`font-size:.9em;`
 const Comments = styled.div`margin-top: 1em;`
 return <PostWrapper>
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
}
