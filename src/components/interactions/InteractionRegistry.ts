"use client";

import { DefaultQuiz } from './DefaultQuiz';
import { IdentifyCosts } from './IdentifyCosts';
import { CostCompare } from './CostCompare';
import { FillBlanks } from './FillBlanks';
import { SliderGraph } from './SliderGraph';
import { LinearSavingsWidget } from './LinearSavings';
import { FluidSlider, ActionInput } from './Controls';
import { BentoStacker, BalloonAsset, FractalBlob, LiquidTank, DecodeFormulaQuiz } from './Simulators';
import { CashflowInput } from './CashflowInput';
import { GaussChallenge } from './GaussChallenge';
import { SavingsPlanner } from './SavingsPlanner';
import { InflationBalloon } from './InflationBalloon';
import { PurchasingPowerCalc } from './PurchasingPowerCalc';
import { HalflifeLens } from './HalflifeLens';
import { HalflifeCalc } from './HalflifeCalc';
import { CompoundGrowth } from './CompoundGrowth';
import { BreakpointFinder } from './BreakpointFinder';
import type { InteractionProps } from '@/types/lesson';
import React from 'react';

export const InteractionRegistry: Record<string, React.FC<any>> = {
  'DEFAULT_QUIZ': DefaultQuiz,
  'IDENTIFY_COSTS': IdentifyCosts,
  'COST_COMPARE': CostCompare,
  'FILL_BLANKS': FillBlanks,
  'SLIDER_GRAPH': SliderGraph,
  'LINEAR_SAVINGS': LinearSavingsWidget,
  'FLUID_SLIDER': FluidSlider,
  'BENTO_STACKER': BentoStacker,
  
  // Pragmatic mapped backwards
  'TERMINAL_INPUT': ActionInput,
  'VALVE_CONTROL': FluidSlider,
  'ISOMETRIC_STACKER': BentoStacker,
  'DEFLATOR_SPHERE': BalloonAsset,
  'COMPOUND_ORB': FractalBlob,
  'LIQUID_TANK': LiquidTank,

  // New additions
  'CASHFLOW_INPUT': CashflowInput,
  'DECODE_FORMULA_QUIZ': DecodeFormulaQuiz,

  // Lesson 3
  'GAUSS_CHALLENGE': GaussChallenge,
  'SAVINGS_PLANNER': SavingsPlanner,

  // Lesson 4
  'INFLATION_BALLOON': InflationBalloon,
  'PURCHASING_POWER_CALC': PurchasingPowerCalc,

  // Lesson 5
  'HALFLIFE_LENS': HalflifeLens,
  'HALFLIFE_CALC': HalflifeCalc,

  // Lesson 6
  'COMPOUND_GROWTH': CompoundGrowth,

  // Lesson 7
  'BREAKPOINT_FINDER': BreakpointFinder,
};
