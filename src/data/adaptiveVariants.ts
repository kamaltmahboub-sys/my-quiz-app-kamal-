import type { Question } from '../types';
import { CHAPTER1_REPHRASED_VARIANTS } from './adaptiveVariantsCh1';
import { CHAPTER2A_REPHRASED_VARIANTS } from './adaptiveVariantsCh2A';
import { CHAPTER2B_REPHRASED_VARIANTS } from './adaptiveVariantsCh2B';
import { CHAPTER3_4_REPHRASED_VARIANTS } from './adaptiveVariantsCh3Ch4';
import { CHAPTER5_6_REPHRASED_VARIANTS } from './adaptiveVariantsCh5Ch6';
import { CHAPTER7_8_REPHRASED_VARIANTS } from './adaptiveVariantsCh7Ch8';

export const REPHRASED_VARIANTS_MAP: Record<string, Question> = {
  ...CHAPTER1_REPHRASED_VARIANTS,
  ...CHAPTER2A_REPHRASED_VARIANTS,
  ...CHAPTER2B_REPHRASED_VARIANTS,
  ...CHAPTER3_4_REPHRASED_VARIANTS,
  ...CHAPTER5_6_REPHRASED_VARIANTS,
  ...CHAPTER7_8_REPHRASED_VARIANTS,
};

/**
 * Returns the rephrased / alternate-approach variant for a question if available,
 * preserving its original baseId and diagram figureId.
 */
export function getRephrasedQuestionVariant(question: Question): Question {
  const baseId = question.baseId ?? question.id;
  const variant = REPHRASED_VARIANTS_MAP[baseId];
  if (!variant) {
    return {
      ...question,
      baseId,
      figureId: question.figureId ?? baseId,
    };
  }
  return {
    ...variant,
    baseId,
    figureId: variant.figureId ?? question.figureId ?? baseId,
  };
}
