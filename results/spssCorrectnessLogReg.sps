﻿* Encoding: UTF-8.

* Generalized Estimating Equations.
GENLIN correct (REFERENCE=LAST) BY condition comparisonType (ORDER=ASCENDING)
  /MODEL condition comparisonType condition*comparisonType INTERCEPT=YES
 DISTRIBUTION=BINOMIAL LINK=LOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=comparisonType*condition SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

PRESERVE.
SET DECIMAL DOT.

GET DATA  /TYPE=TXT
  /FILE="C:\Users\oamir\Documents\GitHub\agentSummaryExperiment\results\confidenceValuesExp1.csv"
  /ENCODING='Locale'
  /DELCASE=LINE
  /DELIMITERS=","
  /ARRANGEMENT=DELIMITED
  /FIRSTCASE=2
  /DATATYPEMIN PERCENTAGE=95.0
  /VARIABLES=
  userid AUTO
  key AUTO
  summary AUTO
  agent1 AUTO
  agent2 AUTO
  selection AUTO
  value AUTO
  time AUTO
  worseAgent AUTO
  betterAgent AUTO
  comparisonType AUTO
  /MAP.
RESTORE.

CACHE.
EXECUTE.
DATASET NAME DataSet4 WINDOW=FRONT.

DATASET ACTIVATE DataSet5.
* Generalized Estimating Equations.
GENLIN confidence (ORDER=ASCENDING) BY summary comparisonType (ORDER=ASCENDING)
  /MODEL summary comparisonType 
 DISTRIBUTION=MULTINOMIAL LINK=CUMLOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=comparisonType*summary SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO SUMMARY SOLUTION.

CORRELATIONS
  /VARIABLES=confidence correct
  /PRINT=TWOTAIL NOSIG
  /MISSING=PAIRWISE.

CORRELATIONS
  /VARIABLES=confidence correct
  /PRINT=TWOTAIL NOSIG
  /MISSING=PAIRWISE.
NONPAR CORR
  /VARIABLES=confidence correct
  /PRINT=SPEARMAN TWOTAIL NOSIG
  /MISSING=PAIRWISE.

DATASET ACTIVATE DataSet6.
* Generalized Estimating Equations.
GENLIN confidence (ORDER=ASCENDING) BY summary comparisonType (ORDER=ASCENDING)
  /MODEL summary comparisonType 
 DISTRIBUTION=MULTINOMIAL LINK=CUMLOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=comparisonType*summary SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

DATASET ACTIVATE DataSet8.
* Generalized Estimating Equations.
GENLIN correct (REFERENCE=LAST) BY summary comparisonType (ORDER=ASCENDING)
  /MODEL summary comparisonType INTERCEPT=YES
 DISTRIBUTION=BINOMIAL LINK=LOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=comparisonType*summary SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

* Generalized Estimating Equations.
GENLIN correct (REFERENCE=LAST) BY summary comparisonType (ORDER=ASCENDING)
  /MODEL summary comparisonType summary*comparisonType INTERCEPT=YES
 DISTRIBUTION=BINOMIAL LINK=LOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=comparisonType*summary SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

* Generalized Estimating Equations.
GENLIN correct (REFERENCE=LAST) BY summary comparisonType (ORDER=ASCENDING)
  /MODEL summary comparisonType summary*comparisonType INTERCEPT=YES
 DISTRIBUTION=BINOMIAL LINK=LOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=comparisonType*summary SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.
