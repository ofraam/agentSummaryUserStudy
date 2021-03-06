﻿* Encoding: UTF-8.

DATASET ACTIVATE DataSet1.
* Generalized Estimating Equations.
GENLIN correct (REFERENCE=LAST) BY condition comparisonType (ORDER=ASCENDING)
  /MODEL condition comparisonType INTERCEPT=YES
 DISTRIBUTION=BINOMIAL LINK=LOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=condition*comparisonType SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

DATASET ACTIVATE DataSet1.
* Generalized Estimating Equations.
GENLIN correct (REFERENCE=LAST) BY condition  (ORDER=ASCENDING)
  /MODEL condition  INTERCEPT=YES
 DISTRIBUTION=BINOMIAL LINK=LOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=condition*comparisonType SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

DATASET ACTIVATE DataSet2.
USE ALL.
COMPUTE filter_$=(summary  = "max" or summary = "random").
VARIABLE LABELS filter_$ 'summary  = "max" or summary = "random" (FILTER)'.
VALUE LABELS filter_$ 0 'Not Selected' 1 'Selected'.
FORMATS filter_$ (f1.0).
FILTER BY filter_$.
EXECUTE.

* Generalized Estimating Equations.
GENLIN confidence (ORDER=ASCENDING) BY summary comparisonType (ORDER=ASCENDING)
  /MODEL summary comparisonType 
 DISTRIBUTION=MULTINOMIAL LINK=CUMLOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=summary*comparisonType SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

* Generalized Estimating Equations.
GENLIN confidence (ORDER=ASCENDING) BY summary comparisonType (ORDER=ASCENDING)
  /MODEL summary comparisonType summary*comparisonType 
 DISTRIBUTION=MULTINOMIAL LINK=CUMLOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=summary*comparisonType SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

DATASET ACTIVATE DataSet2.
USE ALL.
COMPUTE filter_$=((summary  = "max" or summary = "first") and (comparisonType = 3)).
VARIABLE LABELS filter_$ 'summary  = "max" or summary = "random" (FILTER)'.
VALUE LABELS filter_$ 0 'Not Selected' 1 'Selected'.
FORMATS filter_$ (f1.0).
FILTER BY filter_$.
EXECUTE.

* Generalized Estimating Equations.
GENLIN confidence (ORDER=ASCENDING) BY summary (ORDER=ASCENDING)
  /MODEL summary 
 DISTRIBUTION=MULTINOMIAL LINK=CUMLOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=summary*comparisonType SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.


DATASET ACTIVATE DataSet3.
*Nonparametric Tests: One Sample. 
NPTESTS 
  /ONESAMPLE TEST (userid key agent summary1 summary2 time valueNormalized comparisonType) 
    WILCOXON(TESTVALUE=4) 
  /MISSING SCOPE=ANALYSIS USERMISSING=EXCLUDE
  /CRITERIA ALPHA=0.05 CILEVEL=95.

USE ALL.
COMPUTE filter_$=(comparisonType = "vsFirst" and agent = 200).
VARIABLE LABELS filter_$ 'comparisonType = "vsFirst" and agent = 200 (FILTER)'.
VALUE LABELS filter_$ 0 'Not Selected' 1 'Selected'.
FORMATS filter_$ (f1.0).
FILTER BY filter_$.
EXECUTE.


*Nonparametric Tests: One Sample. 
NPTESTS 
  /ONESAMPLE TEST (valueNormalized) WILCOXON(TESTVALUE=4) 
  /MISSING SCOPE=ANALYSIS USERMISSING=EXCLUDE
  /CRITERIA ALPHA=0.05 CILEVEL=95.


FREQUENCIES VARIABLES=valueNormalized
  /STATISTICS=MEDIAN
  /ORDER=ANALYSIS.



* Generalized Estimating Equations.
GENLIN correct (REFERENCE=LAST) BY summary comparisonType (ORDER=ASCENDING)
  /MODEL summary comparisonType summary*comparisonType INTERCEPT=YES
 DISTRIBUTION=BINOMIAL LINK=LOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=summary*comparisonType SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

* Generalized Estimating Equations.
GENLIN correct (REFERENCE=LAST) BY summary comparisonType (ORDER=ASCENDING)
  /MODEL summary  INTERCEPT=YES
 DISTRIBUTION=BINOMIAL LINK=LOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=summary*comparisonType SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

* Generalized Linear Models.
GENLIN correct (REFERENCE=LAST) BY summary (ORDER=ASCENDING)
  /MODEL summary INTERCEPT=YES
 DISTRIBUTION=BINOMIAL LINK=LOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 COVB=MODEL MAXITERATIONS=100 MAXSTEPHALVING=5 
    PCONVERGE=1E-006(ABSOLUTE) SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 CITYPE=WALD 
    LIKELIHOOD=FULL
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

* Generalized Estimating Equations.
GENLIN correct (REFERENCE=LAST) BY summary  (ORDER=ASCENDING)
  /MODEL summary  INTERCEPT=YES
 DISTRIBUTION=BINOMIAL LINK=LOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=summary SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

DATASET ACTIVATE DataSet5.
USE ALL.
COMPUTE filter_$=((summary = "maxdiv" or summary = "random")).
VARIABLE LABELS filter_$ 'summary = "max" or summary = "maxdiv" (FILTER)'.
VALUE LABELS filter_$ 0 'Not Selected' 1 'Selected'.
FORMATS filter_$ (f1.0).
FILTER BY filter_$.
EXECUTE.



* Generalized Estimating Equations.
GENLIN correct (REFERENCE=LAST) BY summary comparisonType (ORDER=ASCENDING)
  /MODEL summary comparisonType summary*comparisonType INTERCEPT=YES
 DISTRIBUTION=BINOMIAL LINK=LOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=summary*comparisonType SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

* Generalized Estimating Equations.
GENLIN correct (REFERENCE=LAST) BY summary comparisonType (ORDER=ASCENDING)
  /MODEL summary INTERCEPT=YES
 DISTRIBUTION=BINOMIAL LINK=LOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=summary*comparisonType SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

* Generalized Estimating Equations.
GENLIN correct (REFERENCE=LAST) BY summary comparisonType (ORDER=ASCENDING)
  /MODEL summary comparisonType  INTERCEPT=YES
 DISTRIBUTION=BINOMIAL LINK=LOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=summary*comparisonType SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.


DATASET ACTIVATE DataSet6.
USE ALL.
COMPUTE filter_$=((summary="random" or summary="maxdiv") and comparisonType=3).
VARIABLE LABELS filter_$ '(summary="max" or summary="maxdiv") and comparisonType=1 (FILTER)'.
VALUE LABELS filter_$ 0 'Not Selected' 1 'Selected'.
FORMATS filter_$ (f1.0).
FILTER BY filter_$.
EXECUTE.

* Generalized Estimating Equations.
GENLIN value (ORDER=ASCENDING) BY summary  (ORDER=ASCENDING)
  /MODEL summary  
 DISTRIBUTION=MULTINOMIAL LINK=CUMLOGIT
  /CRITERIA METHOD=FISHER(1) SCALE=1 MAXITERATIONS=100 MAXSTEPHALVING=5 PCONVERGE=1E-006(ABSOLUTE) 
    SINGULAR=1E-012 ANALYSISTYPE=3(WALD) CILEVEL=95 LIKELIHOOD=FULL
  /REPEATED SUBJECT=userid WITHINSUBJECT=summary*comparisonType SORT=YES CORRTYPE=INDEPENDENT 
    ADJUSTCORR=YES COVB=ROBUST MAXITERATIONS=100 PCONVERGE=1e-006(ABSOLUTE) UPDATECORR=1
  /MISSING CLASSMISSING=EXCLUDE
  /PRINT CPS DESCRIPTIVES MODELINFO FIT SUMMARY SOLUTION.

DATASET ACTIVATE DataSet7.
USE ALL.
COMPUTE filter_$=(comparison = "vsRandom" and agent = 400).
VARIABLE LABELS filter_$ 'comparisonType = "vsFirst" and agent = 200 (FILTER)'.
VALUE LABELS filter_$ 0 'Not Selected' 1 'Selected'.
FORMATS filter_$ (f1.0).
FILTER BY filter_$.
EXECUTE.

*Nonparametric Tests: One Sample. 
NPTESTS 
  /ONESAMPLE TEST (prefMax) WILCOXON(TESTVALUE=4) 
  /MISSING SCOPE=ANALYSIS USERMISSING=EXCLUDE
  /CRITERIA ALPHA=0.05 CILEVEL=95.


FREQUENCIES VARIABLES=prefMax
  /STATISTICS=MEDIAN
  /ORDER=ANALYSIS.
