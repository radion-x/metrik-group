from PIL import Image

def process_logo():
    img = Image.open('public/images/metrik_group_logo.png')
    img = img.convert('RGBA')
    
    data = img.getdata()
    new_data = []
    
    for item in data:
        r, g, b, a = item
        
        if a > 0:
            # If the pixel is distinctly reddish, keep it
            if r > g + 40 and r > b + 40:
                new_data.append(item)
            else:
                # It's black/grey (the dark part). Invert it so black becomes white.
                new_data.append((255 - r, 255 - g, 255 - b, a))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save('public/images/metrik_group_logo_white.png')
    print("Logo processed successfully.")

if __name__ == '__main__':
    process_logo()
