import os
import re

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Revert previous backtick fix and minify
    def fix_cart_query_expression(match):
        val = match.group(1)
        minified = re.sub(r'\s+', ' ', val).strip().replace('"', '&quot;')
        return f'data-wf-cart-query="{minified}"'
    
    new_content = re.sub(r'data-wf-cart-query=\{`([^`]*?)`\}', fix_cart_query_expression, content, flags=re.DOTALL)

    # 2. General multi-line strings attr="..." where there's a newline
    def replace_multiline_string(match):
        attr = match.group(1)
        val = match.group(2)
        if '\n' in val:
            minified = re.sub(r'\s+', ' ', val).strip().replace('"', '&quot;')
            return f'{attr}="{minified}"'
        return match.group(0)

    # Match [\w-]+="..."
    new_content = re.sub(r'([\w-]+)="([^"]*?)"', replace_multiline_string, new_content, flags=re.DOTALL)

    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

if __name__ == "__main__":
    count = 0
    components_dir = 'c:/Users/HS Computers/Documents/webflow coverter/webflow-nextjs-app/components'
    for root, dirs, files in os.walk(components_dir):
        for file in files:
            if file.endswith('.tsx'):
                if fix_file(os.path.join(root, file)):
                    print(f"Fixed {file}")
                    count += 1
    print(f"Total files fixed: {count}")
