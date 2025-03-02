import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonLoading({ height, count }) {
  return (
    <div>
      <Skeleton
        baseColor="#1e1e1e"
        highlightColor="#3c475d"
        style={{ height: `${height}px`, width: "100%" }}
        count={count}
      />
    </div>
  );
}

export default SkeletonLoading;