import PropTypes from 'prop-types';
import cx from 'classnames';

import ResumeSubSection, { subSectionShape } from '../resume-sub-section';
import styles from './index.module.scss';

export const sectionShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
    }),
  ]),
  subSections: PropTypes.arrayOf(PropTypes.shape(subSectionShape)),
  hideForPrint: PropTypes.bool,
};

const ResumeSection = ({ section }) => {
  const sectionContent = Array.isArray(section.content)
    ? section.content.map((content) => {
      return (
        <div>
          {content.screenPrefix && (<span className="u-no-print u-mr4">{content.screenPrefix}</span>)}
          <span dangerouslySetInnerHTML={content.copy} />
        </div>
      )
    })
    : (
      <div dangerouslySetInnerHTML={{ __html: section.content }} />
    );

  return (
    <div className={cx(styles.section, { 'u-no-print': section.hideForPrint })}>
      <h2 className={styles['section-title']}>
        {section.printPrefix && (
          <span className="u-only-print u-mr4 u-inline-block">
            {section.printPrefix}
          </span>
        )}
        {section.title}
      </h2>
      {sectionContent}
      {(section.subSections && section.subSections.length > 0) && (
        section.subSections.map((subsection) => <ResumeSubSection key={subsection.id} subsection={subsection} />)
      )}
    </div>
  )
};

ResumeSection.propTypes = {
  section: PropTypes.shape(sectionShape).isRequired,
};

export default ResumeSection;
