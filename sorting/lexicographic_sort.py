#!/usr/bin/env python3
import functools


# 1 -> a; 4 -> d; ...
def num_to_letter(num):
  ascii_offset = 97
  return str(chr(num + ascii_offset))

# Convert string with non-standard lexicographical ording to the
# corresponding string with standard lexicographical ordering
def _generate_lexico_key_fn(lex_ordering):
  # Map from letter in original string to a letter with the same sort
  # order when using standard sort.
  # e.g. "a" -> "c"
  translation_map = dict([(t[1], num_to_letter(t[0])) for t
                          in enumerate(lex_ordering)])
  translation_fn = lambda orig_char: translation_map[orig_char]
  return lambda orig_str: ''.join(map(translation_fn, orig_str))

def lexico_sort(l, lex_ordering):
  l.sort(key=_generate_lexico_key_fn(lex_ordering))
  return l
