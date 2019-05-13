from pelican import signals


cjk_range = [
    (u'\u3040', u'\u309F'),    # Japanese Hiragana
    (u'\u30A0', u'\u30FF'),    # Japanese Katakana
    (u'\u3400', u'\u4DB5'),    # CJK Unified Ideographs Extension A
    (u'\u4E00', u'\u9FEF'),    # CJK Unified Ideographs
    (u'\uF900', u'\uFAFF'),    # CJK Compatibility Ideographs
    (u'\U00020000', u'\U0002A6D6'),  # CJK Unified Ideographs Extension B
    (u'\U0002A700', u'\U0002B734'),  # CJK Unified Ideographs Extension C
    (u'\U0002b740', u'\U0002B81D'),  # CJK Unified Ideographs Extension D
    (u'\U0002B820', u'\U0002CEA1'),  # CJK Unified Ideographs Extension E
    (u'\U0002ceb0', u'\U0002EBE0'),  # CJK Unified Ideographs Extension F
    (u'\U0002F800', u'\U0002FA1F'),  # CJK Compatibility Ideographs Supplement
]


def with_range(char, check_range):
    # XXX: actually this kind of searching will see a improvment from O(n)
    # to O(1) when using patricia instead of list. but for a blog plugin
    # processing offline, I think it doesn't matter too much. for those who
    # writes a lot, this improvements may be expected.
    for start, end in check_range:
        if char >= start and char <= end:
            return True
    return False


def is_cjk(char):
    return with_range(char, cjk_range)


def remove_newline(text):
    start_idx = 0
    ret = ''

    while True:
        newline_idx = text.find('\n', start_idx)

        if newline_idx == -1 or newline_idx == len(text) - 1:
            ret += text[start_idx:]
            break
        elif newline_idx == start_idx:
            ret += text[newline_idx]
            start_idx += 1
            continue

        ret += text[start_idx:newline_idx]

        if is_cjk(text[newline_idx+1]):
            start_idx = newline_idx + 1  # Skip the newline character
        else:
            start_idx = newline_idx

    return ret


def process_content(content):
    if content._content is None:
        return

    content._content = remove_newline(content._content)


def register():
    signals.content_object_init.connect(process_content)
