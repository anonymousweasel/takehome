#!/usr/bin/env python3
import functools


def _lexico_compare(values, s1, s2):
  for i in range(len(s1)):
    if len(s2) <= i:
      return -1
    letter_compare = values[s1[i]] - values[s2[i]]
    if letter_compare != 0:
      return letter_compare
  return len(s1) - len(s2)

def _generate_lexico_compare_fn(lex_ordering):
  values = dict([(t[1], t[0]) for t in enumerate(lex_ordering)])
  return functools.partial(_lexico_compare, values)

def lexico_sort(l, lex_ordering):
  l.sort(key=functools.cmp_to_key(
         _generate_lexico_compare_fn(lex_ordering)))
  return l
