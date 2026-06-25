with open("src/components/Timeline.jsx", "r", encoding="utf-8") as f:
    content = f.read()

offset = 30802
start = max(0, offset - 150)
end = min(len(content), offset + 150)

print(f"Content around offset {offset}:")
print("---")
print(content[start:end])
print("---")

# Find line number
line_num = content[:offset].count('\n') + 1
print(f"Line number: {line_num}")
