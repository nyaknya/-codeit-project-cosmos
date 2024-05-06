import { useState } from 'react';
import classNames from 'classnames/bind';
import FeedDetails from '@/components/Feed/FeedDetails/index';
import FeedCard from '@/components/Feed/FeedCard/index';
import Modal from '@/components/Common/Layout/Modal';
import styles from './FeedList.module.scss';
import { FeedDetailType } from '../types';
/**
 * @return {JSX.Element} FeedCardList - 추후에 변경 예정입니다. 지금은 목데이터를 화면에 출력하지만 변경한다면 상위 컴포넌트에서 피드 데이터를 받아서 뿌려줄 예정입니다.
 */

export default function FeedList({ feedList }: { feedList: FeedDetailType[] }) {
  const cn = classNames.bind(styles);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [feedId, setFeedId] = useState<number>(0);
  const handleClick = (selectedFeedId: number) => {
    setFeedId(selectedFeedId);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={cn('container')}>
        {feedList?.map((item) => (
          <FeedCard
            key={item.feed.id}
            feedData={item}
            modalVisible={isModalOpen}
            toggleModal={setIsModalOpen}
            hasPadding
            forDetails={false}
            onClick={() => handleClick(item.feed.id)}
          />
        ))}
      </div>
      <Modal
        toggleModal={setIsModalOpen}
        modalVisible={isModalOpen}
        cssModalSize={cn('feed-detail-modalSize')}
        cssComponentDisplay={cn('feed-detail-componentDisplay')}
      >
        <FeedDetails feedId={feedId} />
      </Modal>
    </>
  );
}