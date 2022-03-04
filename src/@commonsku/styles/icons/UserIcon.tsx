import React from 'react';
import SVG, { SVGProps } from '../SvgIcon';

type UserIconProps = SVGProps & { fill?: string;};
export default function UserIcon({
    fill='#fff',
    ...props
}: UserIconProps) {
    return <SVG {...props}>
         <path fill="none" d="M0 0h24v24H0z" />
        <path
            d="M16.67 13.13C18.04 14.06 19 15.32 19 17v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2c0-2.18-3.57-3.47-6.33-3.87ZM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24ZM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4ZM9 13c-2.67 0-8 1.34-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.66-5.33-4-8-4Z"
            fill={fill}
        />
    </SVG>
}

// const iconSize = {
//     small: {
//       height: 16,
//       width: 16,
//     },
//     default: {
//       height: 24,
//       width: 24,
//     },
//   } 
  
// export default function Icon({
//     size = "medium",
//     width = null,
//     height = null,
//     fill = "#fff",
//     style = {},
//     ...props
// }: React.PropsWithChildren<{
//     size?: string,
//     width?: number | string | null,
//     height?: number | string | null,
//     fill?: string,
//     style?: React.CSSProperties,
// }>) {
//     const iconWidth = iconSize[size] ? iconSize[size].width : (width || iconSize['default'].width);
//     const iconHeight = iconSize[size] ? iconSize[size].height : (height || iconSize['default'].height);
//     return (
//             <svg
//                 width={iconWidth}
//                 height={iconHeight}
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 style={style}
//                 {...props}
//             >
//                 <path fill="none" d="M0 0h24v24H0z" />
//                 <path
//                     d="M16.67 13.13C18.04 14.06 19 15.32 19 17v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2c0-2.18-3.57-3.47-6.33-3.87ZM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24ZM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4ZM9 13c-2.67 0-8 1.34-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.66-5.33-4-8-4Z"
//                     fill={fill}
//                 />
//             </svg>
//         );
        
//     }
// };



// return (
//     <svg
//         width={width}
//         height={height}
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         style={style}
//         {...props}
//     >
//         <path fill="none" d="M0 0h24v24H0z" />
//         <path
//         d="M16.67 13.13C18.04 14.06 19 15.32 19 17v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2c0-2.18-3.57-3.47-6.33-3.87ZM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24ZM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4ZM9 13c-2.67 0-8 1.34-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.66-5.33-4-8-4Z"
//         fill={fill}
//         />
//     </svg>
// );

