import React from 'react';

const SvgIntro = (props) => (
  <svg width={301} height={235} {...props}>
    <g fill="none" fillRule="evenodd">
      <text
        fontFamily="OpenSans-Bold, Open Sans"
        fontSize={24}
        fontWeight="bold"
        fill="#FFF"
        transform="translate(-7)"
      >
        <tspan x={92.977} y={110}>
          {`bob stoute`}
        </tspan>
      </text>
      <text
        fontFamily="OpenSans-Bold, Open Sans"
        fontSize={17}
        fontWeight="bold"
        fill="#FFF"
        transform="translate(-7)"
      >
        <tspan x={71.346} y={139}>
          {`media programming`}
        </tspan>
      </text>
      <text
        fontFamily="OpenSans-Regular, Open Sans"
        fontSize={14}
        fill="#FFF"
        transform="translate(-7)"
      >
        <tspan x={60.617} y={231}>
          {`React / React Native / Angular`}
        </tspan>
      </text>
      <g transform="translate(111.377)" fillRule="nonzero">
        <path
          d="M38.542 22.643c6.446 0 11.67-5.069 11.67-11.32C50.212 5.069 44.988 0 38.542 0s-11.67 5.07-11.67 11.323c0 6.251 5.224 11.32 11.67 11.32z"
          fill="#EAEAEA"
        />
        <ellipse fill="#C00" cx={5.062} cy={11.323} rx={5.062} ry={4.91} />
        <ellipse fill="#C00" cx={72.021} cy={11.323} rx={5.061} ry={4.909} />
        <ellipse fill="#C00" cx={38.518} cy={43.823} rx={5.061} ry={4.909} />
        <path
          d="M75.6 44.922c-1.978-1.916-5.182-1.916-7.16 0l-2.6 2.525v-7.404c0-7.52-6.02-14.886-15.094-14.886l-12.205-.01-12.205.01c-9.074 0-15.093 7.366-15.093 14.886v7.403l-2.601-2.525c-1.977-1.916-5.182-1.916-7.159 0a4.806 4.806 0 0 0 0 6.944L14.208 64.21l7.158-6.945V42.81h2.357v21.4H53.36v-21.4h2.356v14.455l7.159 6.945L75.6 51.865a4.805 4.805 0 0 0 0-6.943zm-36.966 3.471c-2.796 0-5.062-2.196-5.062-4.909 0-2.714 2.266-4.91 5.062-4.91 2.793 0 5.062 2.197 5.062 4.91 0 2.714-2.268 4.91-5.062 4.91z"
          fill="#EAEAEA"
        />
      </g>
      <g fill="#FFF">
        <path d="M143.653 189.851a.742.742 0 0 0 0-.988l-7.587-8.44 7.587-8.439a.742.742 0 0 0 0-.988l-.965-1.074a.575.575 0 0 0-.888 0l-8.996 10.008a.742.742 0 0 0 0 .988l8.996 10.007c.25.279.637.279.888 0l.965-1.074zm11.41-22.914c.096-.365-.097-.751-.426-.859l-1.196-.365c-.31-.107-.657.108-.753.473l-7.201 27.724c-.096.365.097.751.425.859l1.197.365c.308.107.656-.108.753-.473l7.2-27.724zm12.682 13.98a.742.742 0 0 0 0-.987l-8.996-10.008a.575.575 0 0 0-.888 0l-.965 1.074a.742.742 0 0 0 0 .988l7.587 8.44-7.587 8.44a.742.742 0 0 0 0 .987l.965 1.074c.251.279.637.279.888 0l8.996-10.007z" />
      </g>
    </g>
  </svg>
);

export default SvgIntro;
