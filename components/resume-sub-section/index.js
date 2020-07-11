import PropTypes from 'prop-types';
import cx from 'classnames';

import ResumeSubSectionContent, { subSectionContentShape } from '../resume-sub-section-content';
import styles from './index.module.scss';

export const subSectionShape = {
  id: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  displayName: PropTypes.string,
  date: PropTypes.string,
  printHalfWidth: PropTypes.bool,
  hideForPrint: PropTypes.bool,
  positions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
  })),
  content: PropTypes.oneOfType(subSectionContentShape),
};

const ResumeSubSection = ({ subsection }) => {
  const positions = subsection.positions && (
    (Array.isArray(subsection.positions) && subsection.positions.length > 1)
      ? subsection.positions.map((position) => (
        <div key={`${position.title}-${position.date}`}>
          <h4 className={cx('u-inline-block', styles['subsection-position-title'])} dangerouslySetInnerHTML={{ __html: position.title }} />
          <time className={styles['subsection-date']}>{position.date}</time>
        </div>
      ))
      : (
        <h4
          className={styles['subsection-position-title']}
          dangerouslySetInnerHTML={{ __html: subsection.positions[0].title }}
        />
      )
  );

  return (
    <div className={cx(styles.subsection, { 'u-print-half': subsection.printHalfWidth, 'u-no-print': subsection.hideForPrint })}>
      <div className={styles['subsection-heading']}>
        {subsection.href
          ? (
            <a href={subsection.href} target="_blank" rel="noopener noreferrer">
              <h3
                dangerouslySetInnerHTML={{ __html: subsection.displayName }}
                className={styles['subsection-title']}
              />
            </a>
          )
          : (
            <h3
              dangerouslySetInnerHTML={{ __html: subsection.displayName }}
              className={styles['subsection-title']}
            />
          )
        }
        <time className={cx(styles['subsection-date'], { [styles['subsection-date-block']]: subsection.printHalfWidth })}>{subsection.date}</time>
        {positions}
        <ResumeSubSectionContent content={subsection.content} />
      </div>
    </div>
  );
};

ResumeSubSection.propTypes = {
  subsection: PropTypes.shape(subSectionShape).isRequired,
};

export default ResumeSubSection;
