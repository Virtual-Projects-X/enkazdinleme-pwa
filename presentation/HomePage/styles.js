import { Col, Row } from 'antd';
import styled from 'styled-components';

export default styled(Col)`
    .btn {
        min-height: 50px;
        border-radius: 12px;

        span {
            font-size: 16px;
        }
    }

    .bullets-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

export const SlidersWrapper = styled(Row)`
    padding: 12px;
`;
