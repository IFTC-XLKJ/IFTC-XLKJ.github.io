import tkinter as tk
from tkinter import filedialog
import os
import json

from vika import Vika
vika = Vika("API Token")
#通过 datasheetId 来指定要从哪张维格表操作数据。
datasheet = vika.datasheet("表ID", field_key="id")

root = tk.Tk()
root.withdraw()
f_path = filedialog.askopenfilename()
print('获取的文件地址：',f_path)
print('上传中，请稍后')
_file = datasheet.upload_file(f_path)
print(_file['url'])
