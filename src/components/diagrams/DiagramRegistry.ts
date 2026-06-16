import React from 'react';
import { CashflowFlow, SequenceChain } from './Lesson1Diagrams';
import { GrowthComparisonChart } from './Lesson1InfoChart';
import { PiggyBankDiagram, StaircaseDiagram, FormulaChainDiagram, DecodeFormulaDiagram, WhyPlusDiagram } from './Lesson2Diagrams';
import { DecodeFormulaQuiz } from '../interactions/Simulators';
import {
  ConcertStoryDiagram,
  StaircaseAreaDiagram,
  GaussFlipDiagram,
  GaussFormulaMinDiagram,
  ConcertProgressDiagram,
} from './Lesson3Diagrams';
import {
  InflationStoryDiagram,
  CscToCsnDiagram,
  CsnFormulaDiagram,
  VietnamInflationDiagram,
} from './Lesson4Diagrams';
import {
  HalflifeStoryDiagram,
  HalflifeIntersectionDiagram,
  LogarithmCompareDiagram,
} from './Lesson5Diagrams';
import {
  CellDivisionDiagram,
  SimpleVsCompoundDiagram,
  BuffetBarsDiagram,
  BeatInflationDiagram,
} from './Lesson6Diagrams';
import {
  TwoFriendsDiagram,
  RaceOfTwoLinesDiagram,
} from './Lesson7Diagrams';

// A mapping of all diagram components available in the system
export const DiagramRegistry = {
  CASHFLOW_FLOW: CashflowFlow,
  SEQUENCE_CHAIN: SequenceChain,
  GROWTH_COMPARISON: GrowthComparisonChart,
  PIGGY_BANK: PiggyBankDiagram,
  STAIRCASE: StaircaseDiagram,
  FORMULA_CHAIN: FormulaChainDiagram,
  DECODE_FORMULA: DecodeFormulaDiagram,
  WHY_PLUS: WhyPlusDiagram,
  DECODE_FORMULA_QUIZ: DecodeFormulaQuiz,
  // Lesson 3
  CONCERT_STORY: ConcertStoryDiagram,
  STAIRCASE_AREA: StaircaseAreaDiagram,
  GAUSS_FLIP: GaussFlipDiagram,
  GAUSS_FORMULA_MIN: GaussFormulaMinDiagram,
  CONCERT_PROGRESS: ConcertProgressDiagram,
  // Lesson 4
  INFLATION_STORY: InflationStoryDiagram,
  CSC_TO_CSN: CscToCsnDiagram,
  CSN_FORMULA: CsnFormulaDiagram,
  VIETNAM_INFLATION: VietnamInflationDiagram,
  // Lesson 5
  HALFLIFE_STORY: HalflifeStoryDiagram,
  HALFLIFE_INTERSECTION: HalflifeIntersectionDiagram,
  LOGARITHM_COMPARE: LogarithmCompareDiagram,
  // Lesson 6
  CELL_DIVISION: CellDivisionDiagram,
  SIMPLE_VS_COMPOUND: SimpleVsCompoundDiagram,
  BUFFET_BARS: BuffetBarsDiagram,
  BEAT_INFLATION: BeatInflationDiagram,
  // Lesson 7
  TWO_FRIENDS: TwoFriendsDiagram,
  RACE_TWO_LINES: RaceOfTwoLinesDiagram,
};
