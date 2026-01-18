import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTable({
  data = [] as Array<{ date: string; clip: string; campaign: string; amount: string }>,
}) {
  return (
    <div className="bg-card border rounded-xl overflow-hidden">
      <div
        className="relative w-full overflow-x-auto overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <Table>
          <TableHeader className="[&_tr]:border-b">
            <TableRow className="bg-accent border-b">
              <TableHead>
                <div className="flex text-xs items-center gap-2 px-4 py-3 w-full text-muted-foreground">
                  Дата
                </div>
              </TableHead>
              <TableHead>
                <div className="flex text-xs items-center gap-2 px-4 py-3 w-full text-muted-foreground">
                  Кліп
                </div>
              </TableHead>
              <TableHead>
                <div className="flex text-xs items-center gap-2 px-4 py-3 w-full text-muted-foreground">
                  Кампанія/Опис
                </div>
              </TableHead>
              <TableHead>
                <div className="flex text-xs items-center gap-2 px-4 py-3 w-full text-muted-foreground">
                  Сума
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="p-12 text-center sm:h-96 h-72 flex flex-col justify-center mx-auto">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Немає доступних нарахувань
                    </h3>
                    <p className="text-gray-600">
                      Надсилайте кліпи до кампаній та починайте заробляти!
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={`${row.date}-${row.clip}-${row.campaign}-${row.amount}`}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.clip}</TableCell>
                  <TableCell>{row.campaign}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Separator className="my-2" />
    </div>
  );
}
