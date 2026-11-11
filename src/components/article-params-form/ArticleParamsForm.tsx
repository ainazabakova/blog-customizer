import {
  defaultArticleState,
  fontFamilyOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  fontSizeOptions,
  type ArticleStateType,
} from '@/constants/articleProps';
import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  articleState: ArticleStateType;
  setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  articleState,
  setArticleState,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(articleState);

  const formRef = useRef<HTMLDivElement>(null);

  useOutsideClickClose({
    isOpen,
    rootRef: formRef,
    onChange: setIsOpen,
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setArticleState(formState);
  };

  const handleReset = (e: React.FormEvent): void => {
    e.preventDefault();
    setFormState(defaultArticleState);
    setArticleState(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />

      <div
        ref={formRef}
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) =>
              setFormState({ ...formState, fontFamilyOption: option })
            }
          />

          <RadioGroup
            title="Размер шрифта"
            name="font-size"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(option) => setFormState({ ...formState, fontSizeOption: option })}
          />

          <Select
            title="Цвет шрифта"
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option) => setFormState({ ...formState, fontColor: option })}
          />

          <Select
            title="Цвет фона"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option) =>
              setFormState({ ...formState, backgroundColor: option })
            }
          />

          <Select
            title="Ширина контента"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option) => setFormState({ ...formState, contentWidth: option })}
          />

          <Separator />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </div>
    </>
  );
};
