import unittest

#from lexicographic_sort import lexico_sort
from lexicographic_sort_cmp import lexico_sort

class TestStringMethods(unittest.TestCase):
  # Example input #1: (["acb", "abc", "bca"], "abc")
  # Example output #1: ["abc","acb","bca"]
  def test_example_1(self):
    self.assertEqual(lexico_sort(["acb", "abc", "bca"], "abc"),
                     ["abc","acb","bca"])

  # Example input #2: (["acb", "abc", "bca"], "cba")
  # Example output #2: ["bca", "acb", "abc"]
  def test_example_2(self):
    self.assertEqual(lexico_sort(["acb", "abc", "bca"], "cba"),
                     ["bca", "acb", "abc"])

  # Example input #3: (["aaa","aa",""], "a")
  # Example output #3: ["", "aa", "aaa"]
  def test_example_3(self):
    self.assertEqual(lexico_sort(["aaa","aa",""], "a"),
                     ["", "aa", "aaa"])

  def test_empty(self):
    self.assertEqual(lexico_sort([], ""),
                     [])

  def test_large(self):
    a_lot = 10000000
    self.assertEqual(lexico_sort(["a" * a_lot, "b" * a_lot], "ba"),
                     ["b" * a_lot, "a" * a_lot])

if __name__ == '__main__':
  unittest.main()
