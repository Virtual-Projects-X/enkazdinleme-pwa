import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html, body {
    margin:0;
    padding:0;
  }

  body {
    box-sizing: border-box;
    font-family:  "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  }

  .cursor-pointer {
    :hover{
      cursor:pointer;
    }
  }
  
  .h-100-f {
    height: 100% !important;
  }

  .w-100-f {
    width: 100% !important;
  }

  .margin-reset-f {
    margin:0px !important;
  }

  .padding-reset-f {
    padding:0px !important;
  }

  .vertical-sb{
    display:flex;
    flex-direction:column;
    justify-content: space-between;
  }

  .vertical-sb-start{
    display:flex;
    flex-direction:column;
    align-items:start;
    justify-content: space-between;
  }


  .vertical-end{
    display:flex;
    flex-direction:column;
    align-items:flex-end;
  }

  .vertical-sb-center{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: space-between;
  }

  .horizontal-center{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content: center;
  }


  .horizontal-sb-center{
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content: space-between;
  }

  .pointer-events-none{
    pointer-events:none;
  }

  .mb-xs {
      padding-bottom: 8px;
  }
  .mb-sm {
      margin-bottom: 16px;
  }
  .mb-md {
      margin-bottom: 24px;
  }

  .mt-xs {
      margin-top: 8px;
  }
  .mt-sm {
      margin-top: 16px;
  }
  .mt-md {
      margin-top: 24px;
  }

  .ml-xs {
      margin-left: 8px;
  }
  .ml-sm {
      margin-left: 16px;
  }
  .ml-md {
      margin-left: 24px;
  }

  .mr-xs {
      margin-right: 8px;
  }
  .mr-sm {
      margin-right: 16px;
  }
  .mr-md {
      margin-right: 24px;
  }

  .pl-xs {
      padding-left: 8px;
  }
  .pl-sm {
      padding-left: 16px;
  }
  .pl-md {
      padding-left: 24px;
  }

  .pb-xs {
      padding-bottom: 8px;
  }
  .pb-sm {
      padding-bottom: 16px;
  }
  .pb-md {
      padding-bottom: 24px;
  }

  .pr-xs {
      padding-right: 8px;
  }
  .pr-sm {
      padding-right: 16px;
  }
  .pr-md {
      padding-right: 24px;
  }

  .pt-xs {
      padding-top: 8px;
  }
  .pt-sm {
      padding-top: 16px;
  }
  .pt-md {
      padding-top: 24px;
  }



  .fadeIn-keyframe{
    animation: fadeIn ease 5s;
    -webkit-animation: fadeIn ease 5s;
    -moz-animation: fadeIn ease 5s;
    -o-animation: fadeIn ease 5s;
    -ms-animation: fadeIn ease 5s;

    @keyframes fadeIn {
       0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @-moz-keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @-webkit-keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @-o-keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
  }
`;
