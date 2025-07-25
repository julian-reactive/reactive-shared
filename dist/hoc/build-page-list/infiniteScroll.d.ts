import React, { ReactElement } from 'react';
type InfiniteScrollProps = {
    page: number;
    onNext: () => void;
    items: ReactElement[];
};
declare const IScroll: React.FC<InfiniteScrollProps>;
export default IScroll;
